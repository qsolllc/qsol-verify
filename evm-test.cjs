const fs = require("fs");
const solc = require("solc");
const { ethers } = require("ethers");

const ROOT = process.env.HOME + "/zk-gaming-arena";

function decode(proof) {
    return {
        a: [BigInt(proof.pi_a[0]), BigInt(proof.pi_a[1])],
        b: [
            [BigInt(proof.pi_b[0][1]), BigInt(proof.pi_b[0][0])],
            [BigInt(proof.pi_b[1][1]), BigInt(proof.pi_b[1][0])],
        ],
        c: [BigInt(proof.pi_c[0]), BigInt(proof.pi_c[1])],
    };
}

function compile(files) {
    const sources = {};
    for (const f of files) sources[f.name] = { content: fs.readFileSync(f.path, "utf8") };
    const out = JSON.parse(solc.compile(JSON.stringify({
        language: "Solidity",
        sources,
        settings: {
            optimizer: { enabled: true, runs: 200 },
            outputSelection: { "*": { "*": ["abi", "evm.bytecode.object"] } }
        }
    })));
    if (out.errors) {
        const fatal = out.errors.filter(e => e.severity === "error");
        out.errors.forEach(e => console.error(e.formattedMessage));
        if (fatal.length) process.exit(1);
    }
    return out.contracts;
}

(async () => {
    console.log("=== Local EVM Groth16 Test ===\n");

    const c = compile([
        { name: "BattleVerifier.sol", path: ROOT + "/contracts/BattleVerifier.sol" },
        { name: "BattleEngine.sol",   path: ROOT + "/contracts/BattleEngine.sol"   },
    ]);
    const V = c["BattleVerifier.sol"]["Groth16Verifier"];
    const E = c["BattleEngine.sol"]["BattleEngine"];

    console.log("[1] Compiled:");
    console.log("      Verifier:", V.evm.bytecode.object.length / 2, "bytes");
    console.log("      Engine:  ", E.evm.bytecode.object.length / 2, "bytes");

    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    const signer = await provider.getSigner(0);
    const net = await provider.getNetwork();
    console.log("[2] Chain:", net.chainId.toString(), "Signer:", await signer.getAddress());

    const verifier = await new ethers.ContractFactory(V.abi, "0x" + V.evm.bytecode.object, signer).deploy();
    await verifier.waitForDeployment();
    const vAddr = await verifier.getAddress();
    console.log("[3] Verifier deployed:", vAddr);

    const engine = await new ethers.ContractFactory(E.abi, "0x" + E.evm.bytecode.object, signer).deploy(vAddr);
    await engine.waitForDeployment();
    const eAddr = await engine.getAddress();
    console.log("[4] Engine deployed:  ", eAddr);

    const proofPath = process.env.PROOF_PATH || (ROOT + "/proofs/battle_proof.json");
    const publicPath = process.env.PUBLIC_PATH || (ROOT + "/proofs/battle_public.json");
    const proof = JSON.parse(fs.readFileSync(proofPath));
    const pub = JSON.parse(fs.readFileSync(publicPath));
    const { a, b, c: pc } = decode(proof);
    const sigs = pub.map(x => BigInt(x));
    console.log("[5] Public signal:", sigs.join(","));

    // TEST 1
    const t1 = await verifier.verifyProof.staticCall(a, b, pc, sigs);
    console.log("[6] TEST 1 (valid proof):       ", t1);
    if (t1 !== true) { console.error("FAIL"); process.exit(1); }

    // TEST 2
    const tampered = [sigs[0] === 1n ? 2n : 1n];
    const t2 = await verifier.verifyProof.staticCall(a, b, pc, tampered);
    console.log("[7] TEST 2 (tampered signal):   ", t2);
    if (t2 !== false) { console.error("FAIL: rubber stamp"); process.exit(1); }

    // TEST 3 — transaction through engine
    const tx = await engine.submitBattle(1n, a, b, pc, sigs);
    const rc = await tx.wait();
    console.log("[8] TEST 3 (tx status):         ", rc.status, "gas:", rc.gasUsed.toString());
    if (rc.status !== 1) { console.error("FAIL"); process.exit(1); }

    // TEST 4 — state
    const recorded = await engine.battleWinner(1n);
    console.log("[9] TEST 4 (state recorded):    ", recorded.toString());
    if (recorded !== sigs[0]) { console.error("FAIL"); process.exit(1); }

    // TEST 5 — replay
    let replayed = false;
    try { await (await engine.submitBattle(1n, a, b, pc, sigs)).wait(); } catch (_) { replayed = true; }
    console.log("[10] TEST 5 (replay rejected):  ", replayed);
    if (!replayed) { console.error("FAIL"); process.exit(1); }

    // TEST 6 — tampered rejected on-chain
    let tamperRejected = false;
    try { await (await engine.submitBattle(2n, a, b, pc, tampered)).wait(); } catch (_) { tamperRejected = true; }
    console.log("[11] TEST 6 (tamper rejected):  ", tamperRejected);
    if (!tamperRejected) { console.error("FAIL"); process.exit(1); }

    console.log("");
    console.log("=".repeat(48));
    console.log("ALL TESTS PASSED");
    console.log("=".repeat(48));
    console.log("Verifier:", vAddr);
    console.log("Engine:  ", eAddr);
})().catch(e => { console.error("FATAL:", e.message); process.exit(1); });
