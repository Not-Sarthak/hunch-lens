// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import "forge-std/console.sol";
import {SocialMediaNFTMarket} from "../src/Hunch.sol";

contract MintPost is Script {
    address public marketAddress = 0x7f50726fF84Cb4f04fC887e110EdD6CEBC14BdDa;

    function run() external {
        vm.startBroadcast();

        SocialMediaNFTMarket market = SocialMediaNFTMarket(marketAddress);

        string memory postHash = "sarthak";
        string memory authorHandle = "@0xsarthak";
        address creator = 0xB54b4CEA3AF35fEbA9650c03E5d2287c840383fD; 
        address curator = 0xef7E2F8F5c7c8ae0Bfd1A7D55628616175BC25FB; 
        uint256 replyCount = 10;
        uint256 recastCount = 5;
        uint256 likeCount = 100;
        string memory tokenURI = "ipfs://exampleTokenURI";

        string memory mintedPostHash = market.mintPost(
            postHash,
            authorHandle,
            creator,
            curator,
            replyCount,
            recastCount,
            likeCount,
            tokenURI
        );

        console.log("Minted post with hash:", mintedPostHash);

        vm.stopBroadcast();
    }
}
