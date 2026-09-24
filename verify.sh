#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

echo "=== 1. SHA-256 manifest ==="
sha256sum -c MANIFEST.sha256

echo
echo "=== 2. Groth16 — battle ==="
npx snarkjs groth16 verify \
  build/battle_verification_key.json \
  proofs/battle_public.json \
  proofs/battle_proof.json

echo
echo "=== 3. Groth16 — InvariantCheck (positive) ==="
npx snarkjs groth16 verify \
  build/InvariantCheck_verification_key.json \
  proofs/invar_public.json \
  proofs/invar_proof.json

echo
echo "=== 4. Groth16 — InvariantCheck (negative) ==="
npx snarkjs groth16 verify \
  build/InvariantCheck_verification_key.json \
  proofs/invar_public_neg.json \
  proofs/invar_proof_neg.json

echo
echo "ALL VERIFICATIONS PASSED"
