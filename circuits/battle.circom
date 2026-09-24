pragma circom 2.0.0;

// Convert a field element to n bits (each bit is boolean-checked)
template Num2Bits(n) {
    signal input in;
    signal output out[n];
    var lc1 = 0;
    var e2 = 1;
    for (var i = 0; i < n; i++) {
        out[i] <-- (in >> i) & 1;
        out[i] * (out[i] - 1) === 0;   // quadratic: bit ∈ {0,1}
        lc1 += out[i] * e2;
        e2 = e2 + e2;
    }
    lc1 === in;   // linear: reconstruction matches input
}

// Return 1 if in[0] < in[1], else 0
template LessThan(n) {
    assert(n <= 252);
    signal input in[2];
    signal output out;

    component n2b = Num2Bits(n + 1);
    n2b.in <== in[0] + (1 << n) - in[1];

    // Top bit of (a + 2^n - b) tells us if a < b
    out <== 1 - n2b.out[n];
}

template BattleOutcome() {
    // Private inputs: hero stats (each 0..255)
    signal input hero1_attack;
    signal input hero1_defense;
    signal input hero1_speed;
    signal input hero2_attack;
    signal input hero2_defense;
    signal input hero2_speed;

    // Public output: 1 if hero1 wins, 2 if hero2 wins
    signal output claimed_winner;

    // Range check each input to 8 bits (quadratic via Num2Bits)
    component rc[6];
    for (var i = 0; i < 6; i++) {
        rc[i] = Num2Bits(8);
    }
    rc[0].in <== hero1_attack;
    rc[1].in <== hero1_defense;
    rc[2].in <== hero1_speed;
    rc[3].in <== hero2_attack;
    rc[4].in <== hero2_defense;
    rc[5].in <== hero2_speed;

    // Compute powers (max = 3 * 255 = 765, fits in 10 bits)
    signal power1;
    signal power2;
    power1 <== hero1_attack + hero1_defense + hero1_speed;
    power2 <== hero2_attack + hero2_defense + hero2_speed;

    // Compare using LessThan(16) — safe for powers up to 65535
    component lt = LessThan(16);
    lt.in[0] <== power1;
    lt.in[1] <== power2;

    // lt.out = 1 iff power1 < power2
    // So hero1Wins = 1 - lt.out (ties go to hero1)
    signal hero1Wins;
    hero1Wins <== 1 - lt.out;

    // claimed_winner = 1 if hero1Wins else 2
    claimed_winner <== 1 + (1 - hero1Wins);

    // Hard constraint: winner ∈ {1, 2}
    (claimed_winner - 1) * (claimed_winner - 2) === 0;
}

component main = BattleOutcome();
