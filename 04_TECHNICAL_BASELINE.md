Document status: Frozen evidence-controlled baseline
Prepared: 2026-09-22
Company: QSOL LLC
Project: QSOL Verify — Cryptographically Verifiable Evidence Infrastructure
Demonstrator: "zk-gaming-arena" / Battle zero-knowledge implementation

---

## 1. Governing Evidence Standard

This document records the technical propositions presently supported by the QSOL Battle demonstrator evidence.

The governing evidentiary vocabulary is:

| Status | Normative meaning |
|---|---|
| `OBSERVED` | Artifact exists and was directly inspected |
| `CORROBORATED` | A preserved record attests to an event, but the record is not itself the complete proposition |
| `PROPOSITION_ESTABLISHED` | A specific, scope-bounded proposition was tested by a recorded procedure with defined inputs and assumptions |
| `PENDING` | Required execution has not yet occurred |
| `NOT_ESTABLISHED` | Proposition is outside the current technical evidence |
| `RECONCILIATION_REQUIRED` | Conflicting records exist and direct measurement is required |
| `NOT_IN_SCOPE` | Proposition belongs to a different evidentiary dimension |

**Drafting rules**

1. Every "demonstrates" statement identifies the proposition actually tested.
2. "Chain" is not used to imply a single execution when the evidence consists of separate executions.
3. Verification results are not promoted into security, provenance, authorship, ownership, or legal conclusions.
4. Established propositions state their tested conditions.
5. Architecture is expressed in proposed/conditional language; evidence is expressed in evidence language.
6. Conflicting records remain preserved and explicitly labeled.
7. Executive material follows problem -> uncertainty -> foothold -> program -> ask.
8. Capabilities are not listed without evidence status.

---

## 2. Demonstrator Identity

The current technical demonstrator is:

```

~/zk-gaming-arena

```

Primary source:

```

circuits/battle.circom

```

Primary compiled artifacts:

```

build/battle.r1cs
build/battle.sym
build/battle_js/battle.wasm

```

Cryptographic setup artifacts:

```

build/battle_final.zkey
build/battle_verification_key.json
build/pot12_final.ptau

```

Proof artifacts:

```

proofs/input.json
proofs/witness.wtns
proofs/battle_proof.json
proofs/battle_public.json

```

EVM artifacts:

```

contracts/BattleVerifier.sol
contracts/BattleEngine.sol
evm-test.cjs

```

---

## 3. Recorded Toolchain

The recorded technical session identifies:

| Component | Recorded version |
|---|---|
| Node.js | `v26.3.1` |
| npm | `11.17.0` |
| Circom | `2.2.3` |
| snarkjs | `0.7.6` |
| solc-js | `0.8.13+commit.abaa5c0e.Emscripten.clang` |
| Circom `--sanity_check` level | `not recorded` |

Recorded host:

| Property | Value |
|---|---|
| OS | Linux / Termux Android |
| Architecture | `aarch64` |
| Kernel | `6.1.157-android14-11` |

All reproducibility conclusions are bounded to the recorded environment and procedure.

No claim is made that byte-identical reproduction necessarily occurs under other compiler versions, operating systems, architectures, or build configurations.

---

## 4. Source Artifact

Artifact:

```

circuits/battle.circom

```

SHA-256:

```

a9f05165deecbe1aa621277a1ff0eb3e84319dc9c38dd1c5bf1d7c017923f7c4

```

Status: `OBSERVED`

The source artifact was directly identified and hashed.

The hash establishes identity of the inspected byte sequence.

It does not independently establish:

- authorship;
- historical provenance;
- ownership;
- exclusivity.

Those are separate propositions.

---

## 5. Circuit Metadata

The preserved R1CS metadata records:

| Property | Value |
|---|---|
| Curve | `bn-128` |
| Wires | `78` |
| Constraints | `79` |
| Private inputs | `6` |
| Public inputs | `0` |
| Labels | `86` |
| Outputs | `1` |

The Circom compilation output records:

| Property | Value |
|---|---|
| Template instances | `4` |
| Non-linear constraints | `66` |
| Linear constraints | `13` |
| Public inputs | `0` |
| Private inputs | `6` |
| Public outputs | `1` |
| Wires | `78` |
| Labels | `86` |

Status: `OBSERVED`

These values describe the inspected compilation output.

---

## 6. Source to R1CS Relationship

**Procedure**

The preserved circuit source was compiled with Circom 2.2.3 under the recorded compilation conditions.

The resulting R1CS was compared byte-for-byte against the preserved R1CS.

**Preserved R1CS**

```

build/battle.r1cs

```

SHA-256:

```

9c11558cd3d6c7af8bc7dc0a571091a50236d030b8d5ca5478d18ca79bb00f0b

```

**Result**

```

R1CS: MATCH

```

Status: `PROPOSITION_ESTABLISHED`

**Established proposition**

> Under the recorded Circom 2.2.3 compilation procedure, the preserved `battle.circom` source reproduced the preserved `battle.r1cs` byte-for-byte.

---

## 7. Source to SYM Relationship

**Preserved artifact**

```

build/battle.sym

```

SHA-256:

```

6181ba7404a9b90d339c0eef7ccd5da46be9cf8adb688b5bf01ed09cf4b6eaa3

```

**Result**

```

SYM: MATCH

```

Status: `PROPOSITION_ESTABLISHED`

**Established proposition**

> Under the recorded Circom 2.2.3 compilation procedure, the preserved `battle.circom` source reproduced the preserved `battle.sym` byte-for-byte.

---

## 8. Source to WASM Relationship

**Preserved artifact**

```

build/battle_js/battle.wasm

```

SHA-256:

```

e05bf082050db35b6e1235d5a79b1c0917fa7bcf11c2a2daa203d72c16cfeffc

```

**Result**

```

WASM: MATCH

```

Status: `PROPOSITION_ESTABLISHED`

**Established proposition**

> Under the recorded Circom 2.2.3 compilation procedure, the preserved `battle.circom` source reproduced the preserved WebAssembly artifact byte-for-byte.

---

## 9. Source-to-Build Summary

The three source-to-artifact propositions are separately established:

| Relationship | Status | Procedure |
|---|---|---|
| Source -> R1CS | `PROPOSITION_ESTABLISHED` | Circom 2.2.3; byte comparison |
| Source -> SYM | `PROPOSITION_ESTABLISHED` | Circom 2.2.3; byte comparison |
| Source -> WASM | `PROPOSITION_ESTABLISHED` | Circom 2.2.3; byte comparison |

The correct characterization is:

> The preserved source has three separately established byte-reproduction relationships with the tested compiled artifacts.

The evidence does not constitute a single source-to-production execution transcript.

**Build configuration boundary**

All three reproduction propositions are bounded to "the recorded compilation conditions." Circom 2.2.3 introduced `--sanity_check` with a default level of 2, replacing the earlier `constraint_assert_disabled` flag. The produced WebAssembly can differ if the preserved artifact was compiled under a non-default sanity-check level. The flag state is recorded in section 3 as `not recorded`. The reproduction propositions are therefore bounded to the toolchain version alone and do not extend to flag-level build configuration.

---

## 10. Preserved Input Vector

The preserved input vector is:

```json
{
  "hero1_attack": 45,
  "hero1_defense": 30,
  "hero1_speed": 20,
  "hero2_attack": 35,
  "hero2_defense": 40,
  "hero2_speed": 25
}
```

Artifact

```
proofs/input.json
```

SHA-256:

```
10fd4d981c7c473a4b3572acce8bb91ba0e78949882e9e47dfedc8951601f027
```

Status: OBSERVED

The current evidence establishes use of this vector in the recorded test procedure.

It does not establish that the vector represents a production workload or real-world application state.

---

11. Input to Fresh Witness Relationship

A fresh witness was generated using the preserved WebAssembly artifact and preserved input vector.

Fresh witness

```
evidence/FRESH_PROOF_REPRO_2026-09-22/witness.wtns
```

SHA-256:

```
e31a252d98e42fcdd2b6bb20a2154a64df1851c820fe33c4a094e1a4a1d79b7d
```

The witness was checked against the preserved R1CS.

Recorded result

```
Curve bn128
Vars 78
Outputs 1
Public Inputs 0
Private Inputs 6
Labels 86
Constraints 79
Custom Gates false

WITNESS IS CORRECT
WITNESS CHECKING FINISHED SUCCESSFULLY
```

Status: PROPOSITION_ESTABLISHED

Established proposition

Under the recorded snarkjs 0.7.6 witness-generation and witness-checking procedures, the preserved input vector generated a witness satisfying the preserved Battle R1CS.

This proposition is bounded to the preserved input vector, preserved WASM, preserved R1CS, and recorded software versions.

---

12. Fresh Proof Generation

A fresh Groth16 proof was generated from the fresh witness and preserved proving artifacts.

Fresh proof

```
evidence/FRESH_PROOF_REPRO_2026-09-22/proof.json
```

SHA-256:

```
f7c5cd1c9ddb6300560e2f7162229e571b0a08a38828427e55408b5c4116a09e
```

Fresh public output

```
evidence/FRESH_PROOF_REPRO_2026-09-22/public.json
```

SHA-256:

```
7775d850d82800d8b6a6943f1234d13774bb51f1f2b7ef5c8c215743ebda5057
```

Recorded public output

```json
[
  "2"
]
```

Status: CORROBORATED for generation as a preserved execution event.

The generation event is separately established by the subsequent verification proposition below only to the extent that the generated proof is accepted by the verification procedure.

---

13. Fresh Proof to Verification-Key Relationship

The freshly generated proof was verified against:

```
build/battle_verification_key.json
```

using snarkjs 0.7.6.

Recorded result

```
[INFO] snarkJS: OK!
FRESH_GROTH16_VERIFICATION=PASS
```

Expected public-output check

```
EXPECTED_PUBLIC_OUTPUT=PASS
public[0]=2
```

Status: PROPOSITION_ESTABLISHED

Established proposition

Under the recorded snarkjs 0.7.6 Groth16 verification procedure, the preserved fresh proof is accepted against the preserved verification key with public output "2".

This establishes the tested proof/VK verification relationship.

It does not establish the correctness of every semantic interpretation that might be assigned to the public output.

The value "2" is therefore recorded here as an observed public signal, not as an independently established real-world meaning.

---

14. Proving-Key Verification

The preserved proving key was checked with:

```
snarkjs zkey verify \
  build/battle.r1cs \
  build/pot12_final.ptau \
  build/battle_final.zkey
```

Recorded result

```
ZKey Ok!
```

Status: PROPOSITION_ESTABLISHED

Established proposition

Under snarkjs 0.7.6, the preserved proving key passed the specified zkey verification procedure against the supplied R1CS and Powers-of-Tau artifact.

This establishes an internal consistency relationship.

It does not establish:

· ceremony trustworthiness;
· historical ceremony circumstances;
· independent contribution provenance;
· absence of an undisclosed setup compromise.

Setup-shape verification

GAMMA_EQUALS_DELTA was measured directly on 2026-09-22 and returned false. The dummy-setup failure mode in which VK_GAMMA_G2 == VK_DELTA_G2 is therefore excluded for this verification key. This excludes the specific failure mode that has been demonstrated to permit proof forgery without a valid witness; it does not establish that the ceremony was properly conducted, that contributions were honestly made, or that no other setup pathology is present. Those remain separate propositions.

---

15. Verification-Key Metadata

The preserved verification key records:

Property Value
Protocol groth16
Curve bn128
Public inputs 1
IC length 2
GAMMA_EQUALS_DELTA false (measured 2026-09-22)

Status: OBSERVED

The Solidity verifier contains the corresponding Groth16 verification structure, including:

· BN128 constants;
· alpha coordinates;
· beta coordinates;
· gamma coordinates;
· delta coordinates;
· IC points;
· public-input linear combination;
· pairing verification.

The inspected source therefore supports an artifact-level correspondence between the Groth16 verifier structure and the preserved verification-key representation.

A formal byte-for-byte derivation proposition should not be asserted without a dedicated machine-generated comparison record.

---

16. Solidity Verifier

Artifact

```
contracts/BattleVerifier.sol
```

The inspected verifier exposes:

```solidity
verifyProof(
    uint[2] calldata _pA,
    uint[2][2] calldata _pB,
    uint[2] calldata _pC,
    uint[1] calldata _pubSignals
)
```

Status: OBSERVED

The source contains the expected Groth16 pairing verification structure.

This establishes the presence and inspected implementation structure of the verifier.

It does not constitute an independent security audit.

---

17. Prior Local-EVM Verification

A separate prior execution exercised the Solidity verifier and BattleEngine.

Recorded results

Test Result
Valid proof true
Tampered public signal false
Transaction status 1
Recorded winner/state 2
Replay Rejected
Tampered submission Rejected

Local chain ID:

```
1337
```

Status: PROPOSITION_ESTABLISHED

Established proposition

Under the recorded prior local-EVM execution conditions, the tested proof was accepted by the Solidity verifier, the corresponding BattleEngine transaction succeeded and recorded state "2", and the tested replay and tampered-submission cases were rejected.

Evidence:

```
evidence/2026-09-21-local-evm/
```

The proposition is explicitly bounded to that execution.

---

18. Fresh-Proof EVM Verification

The fresh proof was exercised through the Solidity verifier and BattleEngine on 2026-09-22 against a local EVM on chain ID 1337.

Execution metadata

Property Value
Date 2026-09-22
Chain ID 1337
Signer 0xA2804447ffeFA4d82360BDAA03DE10D66c375C73
Verifier 0xF79F7fcc74298A4aB3814C968640432a84080438
BattleEngine 0xEA9F6da2878f451D92C3A2511a85C38c7017fb5a
Public signal 2
Gas (valid-proof tx) 266336

Recorded results

Test Result
Valid proof true
Tampered public signal false
Transaction status 1
Recorded winner/state 2
Replay Rejected
Tampered submission Rejected

Status: PROPOSITION_ESTABLISHED

Established proposition

Under the recorded fresh-proof local-EVM execution conditions on chain ID 1337 on 2026-09-22, the preserved fresh proof was accepted by the deployed Solidity verifier, the corresponding BattleEngine transaction succeeded and recorded state "2", and the tested replay and tampered-submission cases were rejected.

Evidence:

```
evidence/FRESH_EVM_PROOF_2026-09-22/
```

Relationship Status
Fresh proof -> snarkjs verifier PROPOSITION_ESTABLISHED
Prior proof -> Solidity verifier PROPOSITION_ESTABLISHED
Prior proof -> BattleEngine PROPOSITION_ESTABLISHED
Fresh proof -> Solidity verifier PROPOSITION_ESTABLISHED
Fresh proof -> BattleEngine PROPOSITION_ESTABLISHED

The prior EVM evidence at evidence/2026-09-21-local-evm/ remains untouched and separate.

---

19. ZKey Hash Reconciliation

Conflicting historical records existed for:

```
build/battle_final.zkey
```

One preserved record identified:

```
e0dce004cda621f6a6f866629be9c8d6022bda5c7ed0d017274a8768d9ecb
```

A later recorded value differed.

The discrepancy was itself evidence.

It was not silently resolved by selecting the value that appeared more convenient.

The first historical value is 61 hex characters and cannot be a SHA-256 digest as written. It is preserved as recorded and classified as a malformed or truncated transcription rather than a competing valid digest. Classification is recorded, not resolved by retroactive amendment.

Measured record (2026-09-22)

```
CURRENT_ZKEY_SHA256=e0dce004cda621f6a6f866629be9c8d6022bda5c7ed0d017180274a8768d9ecb
PREVIOUS_RECORD_1=e0dce004cda621f6a6f866629be9c8d6022bda5c7ed0d017274a8768d9ecb
PREVIOUS_RECORD_2=e0dce004cda621f6a6f866629be9c8d6022bda5c7ed0d017180274a8768d9ecb
RECORD_1_LENGTH=61
RECORD_2_LENGTH=64
GAMMA_EQUALS_DELTA=false
CIRCOM_SANITY_CHECK_LEVEL=not recorded
RECONCILIATION_STATUS=resolved
```

The current artifact matches PREVIOUS_RECORD_2 exactly. PREVIOUS_RECORD_1 is preserved as a malformed historical record.

Status: PROPOSITION_ESTABLISHED for current artifact identity.

Evidence:

```
evidence/ZKEY_RECON_2026-09-22/
```

---

20. Fresh-Proof Evidence Package

Persistent evidence directory:

```
evidence/FRESH_PROOF_REPRO_2026-09-22/
```

Recorded artifacts include:

```
BASELINE_SHA256.txt
WITNESS_CHECK.txt
PUBLIC_OUTPUT.txt
GROTH16_VERIFY.txt
FRESH_ARTIFACTS_SHA256.txt
witness.wtns
proof.json
public.json
```

Recorded evidence-file hashes

File SHA-256
BASELINE_SHA256.txt 98cd4f68f7724ac447592361dc7bd1901054e6a2890aad62efc11c69c577d7a4
WITNESS_CHECK.txt a8d7a8e766798130f1d89beab59ee776fe3348f34ea86ea04c2b2b502907ca21
PUBLIC_OUTPUT.txt 7775d850d82800d8b6a6943f1234d13774bb51f1f2b7ef5c8c215743ebda5057
GROTH16_VERIFY.txt 268f2a0657e006c47dbf5b700288f39f1f1608dff46553e99bf7353f840bb2bd
FRESH_ARTIFACTS_SHA256.txt 82adf63d6010b3ebdfac4dd5809dc6da9da873d47e5b3a947bea9ccd298ec8de

These hashes establish integrity identifiers for the preserved evidence files.

They do not independently establish every proposition asserted within those files.

Additional evidence from the 2026-09-22 fresh-proof EVM execution:

```
evidence/FRESH_EVM_PROOF_2026-09-22/
  proof.json
  public.json
  environment.txt
  evm_run.log
  SHA256SUMS.txt
```

---

21. Session Record Boundary

Session record:

```
evidence/sessions/QSOL-ZK-BATTLE-2026-09-22-001.json
```

The session record contains environment, toolchain, artifact, and proposition metadata.

Its command field is:

```json
"commands": []
```

Therefore the session JSON is not itself a command transcript.

Where a proposition depends on execution, the underlying execution record is the operative evidence.

Status: OBSERVED for the session-record structure itself.

The session metadata must not be promoted into an independent execution record.

---

22. Security Boundary

The current technical evidence establishes specific cryptographic and artifact relationships.

It does not establish complete system security.

Successful proof verification does not by itself establish:

· correctness of every circuit semantic assumption;
· correctness of every application-level assumption;
· absence of implementation vulnerabilities;
· compiler security;
· witness-generator security;
· proving-implementation security;
· verifier-implementation security;
· private-key security;
· proving-environment security;
· ceremony trustworthiness;
· resistance to all adversarial inputs;
· production operational security;
· post-quantum resistance of any pairing-based verification path.

Therefore:

```
verification success
        !=
complete system security
```

Proof-system boundary

Groth16 verification depends on pairing-group assumptions that are not post-quantum secure. The proposed system does not claim quantum resistance for any pairing-based verification path. This is a property of the proof system, not of the current implementation.

Status: NOT_ESTABLISHED for the proposition of production security.

---

23. Evidentiary Dimensions

The current baseline must maintain separate dimensions:

Dimension Current technical status
Artifact identity Supported where directly hashed
Artifact integrity Supported for hashed artifacts
Source/build relationship Partially established for tested artifacts
Witness validity Established for tested witness/R1CS
Proof verification Established for tested proof/VK
EVM integration Established for prior tested execution
Fresh-proof EVM integration Established 2026-09-22
Provenance Not established by these technical records
Authorship Not established by these technical records
Ownership Not established by these technical records
Exclusivity Not established by these technical records
Production security Not established
Independent audit Not established
Commercial adoption Not established

This table is a boundary control, not a legal conclusion.

---

24. Proposition Matrix

Proposition Status Tested scope / boundary
Preserved source exists OBSERVED Direct artifact inspection
Preserved R1CS exists OBSERVED Direct artifact inspection
Preserved SYM exists OBSERVED Direct artifact inspection
Preserved WASM exists OBSERVED Direct artifact inspection
Source reproduces R1CS PROPOSITION_ESTABLISHED Circom 2.2.3; byte comparison
Source reproduces SYM PROPOSITION_ESTABLISHED Circom 2.2.3; byte comparison
Source reproduces WASM PROPOSITION_ESTABLISHED Circom 2.2.3; byte comparison
Fresh witness generation occurred CORROBORATED Preserved execution record
Fresh witness satisfies R1CS PROPOSITION_ESTABLISHED snarkjs 0.7.6
Fresh proof generation occurred CORROBORATED Preserved execution record
Fresh proof verifies against VK PROPOSITION_ESTABLISHED snarkjs 0.7.6
Fresh public output is "2" PROPOSITION_ESTABLISHED Fresh public-output record
ZKey passes recorded verification PROPOSITION_ESTABLISHED snarkjs 0.7.6; gamma != delta confirmed
Solidity verifier exists OBSERVED Source inspection
BattleEngine exists OBSERVED Source inspection
Prior proof passes Solidity verifier PROPOSITION_ESTABLISHED Prior local-EVM execution
Prior proof passes BattleEngine PROPOSITION_ESTABLISHED Prior local-EVM execution
Fresh proof passes Solidity verifier PROPOSITION_ESTABLISHED Local EVM chain 1337, 2026-09-22
Fresh proof passes BattleEngine PROPOSITION_ESTABLISHED Local EVM chain 1337, 2026-09-22
Post-quantum resistance (pairing-based paths) NOT_ESTABLISHED Property of Groth16, not of this implementation
Production security NOT_ESTABLISHED Separate security proposition
Independent security audit NOT_ESTABLISHED No audit evidence
Ceremony trustworthiness NOT_ESTABLISHED Beyond zkey consistency
Ceremony contribution provenance NOT_ESTABLISHED Separate provenance proposition
Historical authorship NOT_ESTABLISHED Separate authorship evidence
Historical provenance NOT_ESTABLISHED Separate provenance evidence
Ownership NOT_ESTABLISHED Separate legal proposition
Exclusive ownership NOT_ESTABLISHED Separate legal proposition
Exclusive IP rights NOT_ESTABLISHED Separate legal proposition
Commercial traction NOT_ESTABLISHED Requires commercial evidence
Production deployment NOT_ESTABLISHED No production deployment evidence

---

25. Correct Technical Characterization

The current baseline should be described as:

QSOL has established several separately evidenced technical relationships within a working zero-knowledge demonstrator. Under recorded Circom 2.2.3 conditions, the preserved circuit source reproduces its tested R1CS, symbol, and WebAssembly artifacts byte-for-byte. Under recorded snarkjs 0.7.6 procedures, the preserved input vector produces a witness satisfying the preserved R1CS, and a freshly generated Groth16 proof verifies against the preserved verification key with public output "2". The preserved proving key passes recorded zkey verification with gamma != delta confirmed, excluding the dummy-setup failure mode. A prior local-EVM execution and a fresh-proof local-EVM execution on 2026-09-22 both established the tested Solidity verifier and BattleEngine behaviors.

This formulation is the governing technical summary for the current baseline.

---

26. Relationship to QSOL Verify

The Battle demonstrator is the current experimental substrate.

QSOL Verify is the proposed broader architecture.

The proposed development path is:

```
current experimental substrate
        |
        v
formal evidence specification
        |
        v
canonical evidence representation
        |
        v
portable evidence package
        |
        v
defined verifier interface
        |
        v
security characterization
        |
        v
performance characterization
        |
        v
independent validation
        |
        v
commercial pilot evaluation
```

This is a proposed development path.

It is not evidence that all of these stages currently exist.

---

27. Completion Gates for Current Demonstrator

All completion gates for the current demonstrator baseline are resolved as of 2026-09-22.

Gate 1 — ZKey reconciliation and setup-shape verification: RESOLVED

Evidence:

```
evidence/ZKEY_RECON_2026-09-22/RECONCILIATION.txt
```

GAMMA_EQUALS_DELTA=false; RECONCILIATION_STATUS=resolved.

Gate 2 — Fresh-proof Solidity verification: RESOLVED

Gate 3 — Fresh-proof BattleEngine execution: RESOLVED

Gate 4 — Fresh EVM evidence package: RESOLVED

Evidence:

```
evidence/FRESH_EVM_PROOF_2026-09-22/
```

Gate 5 — Master manifest regeneration: RESOLVED

Evidence:

```
evidence/MANIFEST_2026-09-22.txt
evidence/GATE_SUMMARY_2026-09-22.txt
```

---

28. Baseline Freeze Rule

Completion of the current demonstrator gates permits consideration of a technical demonstrator freeze.

It does not constitute a production-security freeze.

The following remain separate future propositions:

· production security;
· independent security audit;
· ceremony trustworthiness;
· historical provenance;
· authorship;
· ownership;
· exclusivity;
· commercial adoption;
· production deployment.

The final classification before those gates were complete was:

```
CANDIDATE TECHNICAL BASELINE
```

The final classification after the current demonstrator gates were completed on 2026-09-22 is:

```
FROZEN TECHNICAL DEMONSTRATOR BASELINE
```

Only subsequent evidence can establish any stronger characterization.
