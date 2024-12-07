// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {SocialMediaNFTMarket} from "../src/Hunch.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "forge-std/console.sol";

contract BuyPost is Script {
    address public marketAddress = 0x7f50726fF84Cb4f04fC887e110EdD6CEBC14BdDa;
    address public buyer = 0xAA7492E79bdCdE1F72B2E82Fc19D3792D98089B9; 
    address public paymentToken = 0xa9cE3D11B0c4d75ED9c2424132e52d8669BA7DBa; 

    function run() external {
        vm.startBroadcast(buyer);

        IERC20 token = IERC20(paymentToken);
        SocialMediaNFTMarket market = SocialMediaNFTMarket(marketAddress);

        string memory postHash = "hash123";

        uint256 approvalAmount = 100 * 10**18; 
        token.approve(address(market), approvalAmount);

        market.buyPost(postHash);

        console.log("Post bought with hash:", postHash);

        vm.stopBroadcast();
    }
}
