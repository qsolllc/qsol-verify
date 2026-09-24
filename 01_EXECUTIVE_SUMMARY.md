Document status: Frozen funding-dossier baseline
Prepared: 2026-09-22
Company: QSOL LLC
Project: QSOL Verify — Cryptographically Verifiable Evidence Infrastructure
Technical demonstrator: Battle zero-knowledge proof implementation
Evidence standard: Evidence-first; proposition-bounded; no unsupported promotion

---

## 1. Problem

QSOL LLC is developing cryptographic evidence infrastructure for a persistent verification problem: a verifier who did not observe a computation cannot establish selected properties of that computation without either re-executing it, trusting the environment that did, or accepting a declaration.

Each dependency introduces a different cost or assumption: computation may require access to the original environment; replicated execution may require access to inputs and equivalent infrastructure; and declarations require a separate basis for trust.

The proposed research investigates whether a defined class of computational claims can instead be carried by portable cryptographic evidence that a verifier checks independently of the original execution environment and without receiving designated private inputs.

The objective is not to treat cryptography as a substitute for all other forms of evidence. The objective is to determine which propositions can be placed inside a cryptographic verification boundary, which cannot, and how the surrounding evidence can be represented and preserved without collapsing distinct evidentiary dimensions.

---

## 2. Technical Uncertainty

The technical uncertainty is not whether zero-knowledge proof systems function.

The relevant research questions are:

1. Which properties of a computation can usefully and correctly be placed inside a proof boundary?
2. How can the artifacts surrounding that boundary be made reproducible and portable?
3. How can an independent verifier determine exactly what proposition a proof establishes?
4. How should source, compiled artifacts, witnesses, proofs, verification keys, and evidence records be related?
5. What assumptions remain after successful cryptographic verification?
6. What failure modes occur at the boundaries between cryptographic proof, software implementation, evidence provenance, and operational security?
7. What performance and operational constraints determine whether such infrastructure is commercially useful?

These questions define the proposed R&D program.

---

## 3. Existing Technical Foothold

QSOL enters the proposed research with an existing experimental substrate rather than a purely conceptual architecture.

The current technical record establishes three separately evidenced relationships:

**Relationship A — Source to compiled artifacts**

The preserved Battle circuit source reproduces its R1CS, symbol, and WebAssembly artifacts byte-for-byte under the recorded Circom 2.2.3 build conditions.

Status: `PROPOSITION_ESTABLISHED`

**Relationship B — Input to valid witness**

The preserved input vector generates a fresh witness, and the fresh witness satisfies the preserved R1CS under the recorded snarkjs 0.7.6 witness-checking procedure.

Status: `PROPOSITION_ESTABLISHED`

**Relationship C — Fresh proof to verification key**

A freshly generated Groth16 proof verifies against the preserved verification key with public output "2" under snarkjs 0.7.6.

Status: `PROPOSITION_ESTABLISHED`

Each relationship is supported by its own preserved execution record.

They have not been consolidated into a single end-to-end execution transcript.

No such consolidated transcript is claimed.

A separate local-EVM execution, run 2026-09-22 against chain ID 1337, exercised the fresh proof through the Solidity verifier and BattleEngine.

Status: `PROPOSITION_ESTABLISHED` for that execution.

---

## 4. What the Current Evidence Establishes

| Proposition | Status | Scope |
|---|---|---|
| Preserved Battle source exists | `OBSERVED` | Inspected artifact |
| Source reproduces R1CS | `PROPOSITION_ESTABLISHED` | Circom 2.2.3; recorded build |
| Source reproduces SYM | `PROPOSITION_ESTABLISHED` | Circom 2.2.3; recorded build |
| Source reproduces WASM | `PROPOSITION_ESTABLISHED` | Circom 2.2.3; recorded build |
| Fresh witness was generated | `CORROBORATED` | Preserved execution record |
| Fresh witness satisfies R1CS | `PROPOSITION_ESTABLISHED` | snarkjs 0.7.6 |
| Fresh Groth16 proof was generated | `CORROBORATED` | Preserved execution record |
| Fresh proof verifies against preserved VK | `PROPOSITION_ESTABLISHED` | snarkjs 0.7.6 |
| Fresh public output is "2" | `PROPOSITION_ESTABLISHED` | Preserved public-output record |
| Preserved zkey passes zkey verification | `PROPOSITION_ESTABLISHED` | snarkjs 0.7.6; internal consistency; gamma != delta confirmed |
| Solidity verifier exists | `OBSERVED` | Inspected source |
| BattleEngine exists | `OBSERVED` | Inspected source |
| Prior EVM verifier test succeeds | `PROPOSITION_ESTABLISHED` | Prior local-EVM execution |
| Prior BattleEngine test succeeds | `PROPOSITION_ESTABLISHED` | Prior local-EVM execution |
| Fresh proof passes Solidity verifier | `PROPOSITION_ESTABLISHED` | Local EVM chain 1337, 2026-09-22 |
| Fresh proof passes BattleEngine | `PROPOSITION_ESTABLISHED` | Local EVM chain 1337, 2026-09-22 |

---

## 5. Evidence Boundary

The current evidence does not establish:

- production security;
- absence of exploitable implementation vulnerabilities;
- independent security audit;
- trustworthiness of the original proving ceremony;
- independent provenance of ceremony contributions;
- post-quantum resistance of any pairing-based verification path;
- historical authorship;
- historical provenance;
- ownership;
- exclusive ownership;
- exclusive intellectual-property rights;
- commercial traction;
- customer adoption;
- production deployment.

These propositions belong to different evidentiary dimensions.

The dossier therefore maintains the following distinctions:

integrity       != provenance
provenance      != authorship
authorship      != ownership
ownership       != exclusivity
verification    != production security
declaration     != independent evidence
artifact        != legal right


---

## 6. Proposed R&D Program

**QSOL Verify — Cryptographically Verifiable Evidence Infrastructure**

The proposed R&D program will investigate methods for producing portable cryptographic evidence that permits a verifier to establish specified computational propositions without requiring the verifier to reproduce the original execution environment or receive designated private inputs.

The architecture described below is proposed, not represented as an already completed system.

### 6.1 Canonical Evidence Representation

The research will investigate:

- deterministic representations of computation state;
- canonical serialization;
- artifact identity;
- relationship encoding;
- input/output representation;
- verification-statement representation;
- stable hashing;
- evidence-package portability.

### 6.2 Zero-Knowledge Verification

The research will investigate:

- selection of proof-boundary properties;
- separation of private and public data;
- proof-system assumptions;
- verifier interfaces;
- semantic limitations of proof statements;
- failure conditions outside the proof boundary.

### 6.3 Reproducible Artifact Relationships

The research will investigate relationships among:


source

build

compiled artifact

witness

proof

verification

evidence package

```

This diagram describes the proposed architecture of investigation.

It does not represent a claim that the current demonstrator has captured this entire sequence in one execution record.

### 6.4 Independent Verification

The proposed system will investigate portable verification in which a verifier receives a defined evidence package and can determine the proposition established by the cryptographic verification procedure without relying unnecessarily on the original execution environment.

### 6.5 Security Characterization

The research will address:

- cryptographic assumptions;
- post-quantum boundaries of the selected proof system;
- trusted-setup failure modes, including gamma == delta and Phase 2 skip conditions;
- implementation security;
- artifact integrity;
- evidence authenticity;
- provenance boundaries;
- key management;
- proving-environment security;
- verifier security;
- operational security;
- adversarial inputs;
- failure behavior.

A central research question is what remains capable of failing after cryptographic verification succeeds.

### 6.6 Operationalization

The prototype will be evaluated for:

- proving performance;
- verification performance;
- evidence-package size;
- portability;
- reproducibility;
- failure behavior;
- integration requirements;
- operational constraints.

Potential application domains will be evaluated rather than presumed validated.

---

## 7. Proposed Phase-I Outcome

The intended Phase-I outcome is a technically characterized QSOL Verify prototype containing:

1. a formal evidence/proof specification;
2. deterministic evidence serialization;
3. reproducible artifact handling;
4. portable verification packages;
5. documented verification interfaces;
6. explicit cryptographic assumptions;
7. a documented threat model;
8. benchmark measurements;
9. adversarial and boundary testing;
10. independent technical validation where feasible; and
11. a defined path toward commercial pilot evaluation.

Each substantive result should have:

- a defined proposition;
- an acceptance procedure;
- specified inputs;
- recorded assumptions;
- a preserved result; and
- an explicit evidence status.

---

## 8. Commercial Concept

The proposed commercial platform is QSOL Verify.

The proposed commercial concept is cryptographically verifiable evidence infrastructure for software and computational processes.

Potential application domains include:

- software provenance;
- AI/model provenance;
- compliance evidence;
- cybersecurity;
- forensic evidence;
- financial computation;
- distributed systems;
- blockchain applications;
- offline or air-gapped verification;
- machine-verifiable audit packages.

These are prospective application domains, not claims of current market adoption.

The current technical record does not establish:

- customers;
- revenue;
- market share;
- production deployment;
- customer adoption;
- completed commercial pilots; or
- market validation.

---

## 9. Why the Existing Prototype Supports Further R&D

The existing baseline provides a concrete experimental substrate for the proposed research.

It provides separately evidenced footholds in:

1. reproducible source-to-artifact compilation;
2. witness generation and validation;
3. fresh Groth16 proof generation (`CORROBORATED`) and verification (`PROPOSITION_ESTABLISHED`); and
4. Solidity/EVM integration through a separate prior execution and a fresh-proof execution on 2026-09-22.

These footholds permit subsequent research into evidence packaging, verification portability, security characterization, performance, and operational integration.

The proposed R&D therefore concerns extension, formalization, hardening, characterization, and validation of an existing prototype.

It does not represent the current prototype as a finished production platform.

---

## 10. Proposed Research Register

| Research area | Current state | Proposed work |
|---|---|---|
| Source reproducibility | `PROPOSITION_ESTABLISHED` | Generalize across defined environments |
| Witness validation | `PROPOSITION_ESTABLISHED` | Expand boundary and adversarial testing |
| Groth16 verification | `PROPOSITION_ESTABLISHED` | Characterize proof-system assumptions |
| Portable evidence | `NOT_ESTABLISHED` | Design and validate evidence package |
| Canonical evidence encoding | `NOT_ESTABLISHED` | Formalize and test |
| Independent verifier package | `NOT_ESTABLISHED` | Implement and validate |
| Security model | `NOT_ESTABLISHED` | Develop threat model and controls |
| Performance model | `NOT_ESTABLISHED` | Benchmark proving/verification |
| Independent technical validation | `NOT_ESTABLISHED` | Obtain where feasible |
| Commercial pilot | `NOT_ESTABLISHED` | Technically evaluate pilot requirements |

---

## 11. Current Demonstrator Completion Gates

The demonstrator baseline's completion gates in `04_TECHNICAL_BASELINE.md` section 27 are all resolved as of 2026-09-22.

| Gate | Status |
|---|---|
| Gate A — ZKey hash reconciliation and setup-shape verification | `RESOLVED` |
| Gate B — Fresh-proof Solidity verification | `RESOLVED` |
| Gate C — Fresh-proof BattleEngine execution | `RESOLVED` |
| Gate D — Fresh EVM evidence package | `RESOLVED` |
| Gate E — Master manifest regeneration | `RESOLVED` |

Evidence locations:

- `evidence/ZKEY_RECON_2026-09-22/`
- `evidence/FRESH_EVM_PROOF_2026-09-22/`
- `evidence/MANIFEST_2026-09-22.txt`
- `evidence/GATE_SUMMARY_2026-09-22.txt`

---

## 12. Baseline Freeze Boundary

The current demonstrator baseline is frozen as of 2026-09-22.

That freeze establishes a complete technical record of the demonstrator.

It does not establish:

- production security;
- independent security audit;
- proving-ceremony trustworthiness;
- historical authorship;
- historical provenance;
- ownership;
- exclusive rights;
- commercial traction;
- production deployment.

Those remain separate propositions and, where applicable, future R&D or legal/commercial work.

---

## 13. Funding Register

The funding request should follow:

```

problem

technical uncertainty

existing technical foothold

research questions

milestones

acceptance procedures

evidence artifacts

commercialization pathway

```

The funding request should not present an unresolved technical proposition as an established result.

Likewise, a proposed architecture should not be described in the same grammatical register as an observed execution result.

---

## 14. Executive Funding Statement

QSOL proposes to develop cryptographically verifiable evidence infrastructure for defined properties of software computation. The research addresses a verification problem: how a verifier can establish selected computational claims without depending unnecessarily on the original execution environment or receiving designated private inputs. QSOL enters this work with a frozen experimental substrate containing separately evidenced relationships for source-to-artifact reproducibility, witness/R1CS validity, fresh Groth16 proof verification, and successful execution of the fresh proof through a local Solidity verifier and BattleEngine. The proposed research will investigate how these capabilities can be formalized into portable evidence packages, independently usable verification interfaces, explicit security boundaries, reproducible artifact relationships, and measurable operational characteristics.

---

## 15. Funding Context

The funding dossier may evaluate federal R&D programs and separate business-financing mechanisms as distinct financing tracks.

The technical narrative should remain independent of the eventual financing source.

For any specific solicitation, the final application must use the eligibility requirements, scope, deadlines, allowable costs, award limits, and submission requirements applicable to that solicitation at the time of submission.

Funding figures should therefore be treated as current planning inputs until verified against the controlling solicitation.

---

## 16. Executive Status

```

Document: 01_EXECUTIVE_SUMMARY.md
Status: FROZEN_BASELINE

Problem defined: Yes
Technical uncertainty defined: Yes
Existing foothold: Yes
Composite end-to-end execution claimed: No

Source-to-build relationship: PROPOSITION_ESTABLISHED
Witness/R1CS relationship: PROPOSITION_ESTABLISHED
Fresh proof/VK relationship: PROPOSITION_ESTABLISHED
Prior EVM integration: PROPOSITION_ESTABLISHED
Fresh proof -> Solidity verifier: PROPOSITION_ESTABLISHED
Fresh proof -> BattleEngine: PROPOSITION_ESTABLISHED

ZKey hash reconciliation: RESOLVED (matches PREVIOUS_RECORD_2)
GAMMA_EQUALS_DELTA: false (measured 2026-09-22)
CIRCOM_SANITY_CHECK_LEVEL: not recorded
Master manifest: REGENERATED (evidence/MANIFEST_2026-09-22.txt)

Production security: NOT_ESTABLISHED
Independent audit: NOT_ESTABLISHED
Ceremony trustworthiness: NOT_ESTABLISHED
Ownership/exclusivity: NOT_ESTABLISHED by technical evidence
Commercial traction: NOT_ESTABLISHED
Architecture beyond demonstrator: PROPOSED

Baseline classification: FROZEN TECHNICAL DEMONSTRATOR BASELINE
Fully frozen: YES

```
