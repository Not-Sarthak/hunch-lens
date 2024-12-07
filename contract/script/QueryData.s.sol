// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import "forge-std/console.sol";
import {SocialMediaNFTMarket} from "../src/Hunch.sol";

contract QueryData is Script {
    address public marketAddress = 0x7f50726fF84Cb4f04fC887e110EdD6CEBC14BdDa;

    function run() external {
        vm.startBroadcast();

        SocialMediaNFTMarket market = SocialMediaNFTMarket(marketAddress);

        string memory postHash = "hash123";

        SocialMediaNFTMarket.Post memory post = market.getPost(postHash);
        console.log("Post Price:", post.price);
        console.log("Post Creator:", post.creator);
        console.log("Post Curator:", post.curator);

        SocialMediaNFTMarket.Market memory marketData = market.getMarket(postHash);
        console.log("Market Total Volume:", marketData.totalVolume);
        console.log("Market Total Trades:", marketData.totalTrades);

        SocialMediaNFTMarket.TradeHistory[] memory tradeHistory = market.getTradeHistory(postHash);
        for (uint256 i = 0; i < tradeHistory.length; i++) {
            console.log("Trade", i, "Buyer:", tradeHistory[i].buyer);
        }

        vm.stopBroadcast();
    }
}
