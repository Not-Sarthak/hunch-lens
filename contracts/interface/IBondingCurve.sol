// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

/**
 * @title Bonding Curve Interface
 * @dev A bonding curve is a method for continous token minting / burning.
 */
interface IBondingCurve {
    function calculateCurvedMintReturn(uint256 amount) external returns (uint256);

    function calculateCurvedBurnReturn(uint256 amount) external returns (uint256);
}
