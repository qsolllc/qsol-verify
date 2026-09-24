// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface IGroth16Verifier {
    function verifyProof(
        uint[2] calldata _pA,
        uint[2][2] calldata _pB,
        uint[2] calldata _pC,
        uint[1] calldata _pubSignals
    ) external view returns (bool);
}

contract BattleEngine {
    IGroth16Verifier public verifier;
    mapping(uint256 => uint256) public battleWinner;
    mapping(uint256 => bool) public battleRecorded;

    event BattleVerified(uint256 indexed battleId, uint256 winner);

    constructor(address _verifier) {
        require(_verifier != address(0), "zero verifier");
        verifier = IGroth16Verifier(_verifier);
    }

    function submitBattle(
        uint256 battleId,
        uint[2] calldata a,
        uint[2][2] calldata b,
        uint[2] calldata c,
        uint[1] calldata publicSignals
    ) external {
        require(!battleRecorded[battleId], "battle already recorded");
        require(verifier.verifyProof(a, b, c, publicSignals), "invalid proof");
        battleRecorded[battleId] = true;
        battleWinner[battleId] = publicSignals[0];
        emit BattleVerified(battleId, publicSignals[0]);
    }
}
