# QSOL Verify — Cryptographically Verifiable Evidence Infrastructure

Two reference circuits demonstrating portable cryptographic evidence for computational claims.

The problem: a verifier who did not observe a computation cannot establish properties of that computation without either re-executing it, trusting the environment that did, or accepting a declaration. This repository demonstrates a fourth option — portable cryptographic evidence that a verifier checks independently of the original execution environment and without receiving designated private inputs.

## Reference circuits

### InvariantCheck — threshold-policy predicate

Proves `private_state >= public_threshold` bound to a constant sigil, without revealing `private_state` or `sigil`.

| Property | Value |
|---|---|
| Non-linear constraints | 253 |
| Linear constraints | 4 |
| Public inputs | `public_threshold` |
| Public outputs | `is_valid` |
| Private inputs | `private_state`, `sigil` |

Three behavioral modes preserved and verifiable:

| Mode | Result |
|---|---|
| Satisfying witness | `is_valid = 1` |
| Non-satisfying witness | `is_valid = 0` |
| Wrong sigil | Witness generation fails with assert |

### BattleOutcome — multi-input comparison

Proves a game outcome computed from six private 8-bit hero attributes.

| Property | Value |
|---|---|
| Non-linear constraints | 66 |
| Linear constraints | 13 |
| Public inputs | none |
| Public outputs | `claimed_winner ∈ {1, 2}` |
| Private inputs | six hero attributes |

Two behavioral modes preserved and verifiable:

| Mode | Result |
|---|---|
| Hero 1 wins | `["1"]` |
| Hero 2 wins | `["2"]` |

An on-chain verifier (`BattleVerifier.sol`) and integration contract (`BattleEngine.sol`) are included and exercised by `evm-test.cjs` against a local EVM.

## Verification

Prerequisites: Node.js 18+, `npx`.

    ./verify.sh

Four independent checks:

1. `sha256sum -c MANIFEST.sha256` — every shipped artifact matches its recorded hash
2. Groth16 verification of the preserved battle proof
3. Groth16 verification of the InvariantCheck positive proof
4. Groth16 verification of the InvariantCheck negative proof

Any failure exits non-zero.

## Evidence

Every artifact is hash-anchored. The evidence files under `evidence/` document circuit source hashes, compiled artifact hashes, proving and verification key hashes, witness and proof hashes, and trusted-setup contribution hashes.

The two framing documents — `01_EXECUTIVE_SUMMARY.md` and `04_TECHNICAL_BASELINE.md` — describe the technical uncertainty and the evidentiary standard used throughout. The vocabulary is deliberate: `OBSERVED`, `CORROBORATED`, `PROPOSITION_ESTABLISHED`, `PENDING`, `NOT_ESTABLISHED`. Verification results are not promoted into security, provenance, authorship, or legal conclusions.

## Trusted setup

Groth16 trusted setup used the Hermez powers-of-tau ceremony file (`pot12_final.ptau`, 2^12). Contribution hashes are preserved in the evidence manifests. The proving keys (`*.zkey`) are not shipped — they are derivable from the circuit and the public ptau. The verification keys are shipped.

## License

Dual-licensed.

- **Free use** under the [GNU Affero General Public License v3.0](LICENSE).
- **Commercial license** available for proprietary use without AGPL
  source-disclosure obligations. See [LICENSE-COMMERCIAL.md](LICENSE-COMMERCIAL.md)
  or contact qsol.llc@gmail.com.

## Company

QSOL LLC — Pocatello, Idaho — qsol.llc@gmail.com
