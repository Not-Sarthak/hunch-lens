'use client';

import { CONTRACT_ABI, CONTRACT_ADDRESS, TOKEN_ADDRESS } from "src/constants";
import { createPublicClient, http, getContract, createWalletClient, custom } from "viem";
import { baseSepolia } from "viem/chains";

export const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(), 
});

export const approveTokens = async (amount: bigint) => {
    const walletClient = createWalletClient({
        chain: baseSepolia,
        transport: custom(window.ethereum), 
    });
    const accounts = await walletClient.getAddresses();
    const walletAddress = accounts[0];

    const tokenContract = getContract({
        address: TOKEN_ADDRESS,
        abi: [
            "function approve(address spender, uint256 amount) public returns (bool)",
        ],
        client: walletClient,
    });

    const tx = await tokenContract.write.approve([CONTRACT_ADDRESS, amount]);
    console.log("Token approval transaction:", tx);
    return tx;
};

export const mintPost = async (
    postHash: string,
    authorHandle: string,
    creator: `0x${string}`,
    curator: `0x${string}`,
    replyCount: bigint,
    recastCount: bigint,
    likeCount: bigint,
    tokenURI: string,
) => {
    const walletClient = createWalletClient({
        chain: baseSepolia,
        transport: custom(window.ethereum), 
    });
    const accounts = await walletClient.getAddresses();
    const walletAddress = accounts[0];

    const contract = getContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        client: walletClient,
    });

    const tx = await contract.write.mintPost([
        postHash,
        authorHandle,
        creator,
        curator,
        replyCount,
        recastCount,
        likeCount,
        tokenURI,
    ]);
    console.log("Mint post transaction:", tx);
    return tx;
};


export const buyPost = async (
    postHash: string,
    price: bigint, 
) => {
    const walletClient = createWalletClient({
        chain: baseSepolia,
        transport: custom(window.ethereum),
    });
    const accounts = await walletClient.getAddresses();
    const walletAddress = accounts[0];

    await approveTokens(price);

    const contract = getContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        client: walletClient,
    });

    const tx = await contract.write.buyPost([postHash]);
    console.log("Buy post transaction:", tx);
    return tx;
};

export const getPost = async (postHash: string) => {
    const contract = getContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        client: publicClient,
    });

    const post = await contract.read.getPost([postHash]);
    console.log("Post details:", post);
    return post;
};

export const getMarket = async (postHash: string) => {
    const contract = getContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        client: publicClient,
    });

    const market = await contract.read.getMarket([postHash]);
    console.log("Market details:", market);
    return market;
};

export const getTradeHistory = async (postHash: string) => {
    const contract = getContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        client: publicClient,
    });

    const tradeHistory = await contract.read.getTradeHistory([postHash]);
    console.log("Trade history:", tradeHistory);
    return tradeHistory;
};

