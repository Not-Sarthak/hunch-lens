// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import "forge-std/console.sol";
import {SocialMediaNFTMarket} from "../src/Hunch.sol";

contract DeployMarket is Script {
    address public paymentToken = 0xa9cE3D11B0c4d75ED9c2424132e52d8669BA7DBa; 

    function run() external {
        vm.startBroadcast();

        SocialMediaNFTMarket market = new SocialMediaNFTMarket(paymentToken);
        console.log("Market deployed at:", address(market));

        vm.stopBroadcast();
    }
}
