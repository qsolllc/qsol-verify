pragma circom 2.1.0;
include "comparators.circom";

template InvariantCheck() {
    signal input private_state;
    signal input public_threshold;
    signal input sigil;
    signal output is_valid;

    sigil === 13527280201377514951;

    component ge = GreaterEqThan(252);
    ge.in[0] <== private_state;
    ge.in[1] <== public_threshold;
    is_valid <== ge.out;
}

component main {public [public_threshold]} = InvariantCheck();
