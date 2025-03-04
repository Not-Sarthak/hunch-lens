"use client";

import { chains } from '@lens-network/sdk/viem';
import {
  marketFactoryAbi,
  marketFactoryAddress,
  tokenAbi,
} from "src/constants";
import {
  createPublicClient,
  createWalletClient,
  custom,
  getContract,
  http,
} from "viem";
import { toast } from "sonner";

export const publicClient = createPublicClient({
  chain: chains.testnet,
  transport: http(),
});

export const tokenisePost = async ({
  name,
  symbol,
  imageUri,
  text,
  postId,
}: {
  name: string;
  symbol: string;
  imageUri: string;
  text: string;
  postId: string;
}) => {
  const walletClient = createWalletClient({
    chain: chains.testnet,
    transport: custom(window.ethereum),
  });
  const accounts = await walletClient.getAddresses();
  const walletAddress = accounts[0];

  const tokenContract = getContract({
    address: marketFactoryAddress,
    abi: marketFactoryAbi,
    client: walletClient,
  });

  const tx = await tokenContract.write.deploy(
    [name, symbol, BigInt(1), BigInt(1), imageUri, text, postId],
    { account: walletAddress }
  );
  console.log("Token deploy transaction:", tx);
  return tx;
};

export const approvePost = async ({
  contractAddress,
  approvalAddress,
  amount,
}: {
  contractAddress: any;
  approvalAddress: any;
  amount: string;
}) => {
  const walletClient = createWalletClient({
    chain: chains.testnet,
    transport: custom(window.ethereum),
  });
  const accounts = await walletClient.getAddresses();
  const walletAddress = accounts[0];

  const tokenContract = getContract({
    address: contractAddress,
    abi: tokenAbi,
    client: walletClient,
  });

  const tx = await tokenContract.write.approve(
    [approvalAddress, BigInt(amount)],
    {
      account: walletAddress,
    }
  );
  console.log("Token approval transaction:", tx);
  return tx;
};

const formatErrorMessage = (error: any): string => {
  const message = error?.message || "Transaction failed";
  
  // Check if it's a chain mismatch error
  if (message.includes("chain") && message.includes("match")) {
    return "Please switch to Lens Testnet Network";
  }

  // If message is too long, truncate it
  if (message.length > 60) {
    return message.substring(0, 60) + "...";
  }

  return message;
};

export const buyPost = async ({
  contractAddress,
  amount,
}: {
  contractAddress: `0x${string}`;
  amount: string;
}) => {
  try {
    const walletClient = createWalletClient({
      chain: chains.testnet,
      transport: custom(window.ethereum),
    });
    const accounts = await walletClient.getAddresses();
    const walletAddress = accounts[0];

    const tokenContract = getContract({
      address: contractAddress,
      abi: tokenAbi,
      client: walletClient,
    });

    // Convert ETH amount to wei (1 ETH = 1e18 wei)
    const amountInWei = BigInt(Math.floor(parseFloat(amount) * 1e18));

    const tx = await tokenContract.write.mint({
      account: walletAddress,
      value: amountInWei,
    });
    console.log("Token bought transaction:", tx);
    return tx;
  } catch (error: any) {
    console.error("Error buying token:", error);
    toast.error(formatErrorMessage(error));
    throw error;
  }
};

export const sellPost = async ({
  contractAddress,
  amount,
}: {
  contractAddress: `0x${string}`;
  amount: string;
}) => {
  try {
    const walletClient = createWalletClient({
      chain: chains.testnet,
      transport: custom(window.ethereum),
    });
    const accounts = await walletClient.getAddresses();
    const walletAddress = accounts[0];

    const tokenContract = getContract({
      address: contractAddress,
      abi: tokenAbi,
      client: walletClient,
    });

    // Convert ETH amount to wei (1 ETH = 1e18 wei)
    const amountInWei = BigInt(Math.floor(parseFloat(amount) * 1e18));

    const tx = await tokenContract.write.burn([amountInWei], {
      account: walletAddress,
    });
    console.log("Token sold transaction:", tx);
    return tx;
  } catch (error: any) {
    console.error("Error selling token:", error);
    toast.error(formatErrorMessage(error));
    throw error;
  }
};

export const getTokenisedPosts = async () => {
  const contract = getContract({
    address: marketFactoryAddress,
    abi: marketFactoryAbi,
    client: publicClient,
  });

  const market = await contract.read.getLaunchedTokens();
  console.log("Launched tokenised posts:", market);
  return market;
};

export const getTokenisedPost = async (owner: `0x${string}`) => {
  const contract = getContract({
    address: marketFactoryAddress,
    abi: marketFactoryAbi,
    client: publicClient,
  });

  const market = await contract.read.getTokensByDeployer([owner]);
  console.log("Launched tokenised post:", market);
  return market;
};

export const getTokenPrice = async (contractAddress: `0x${string}`) => {
  const tokenContract = getContract({
    address: contractAddress,
    abi: tokenAbi,
    client: publicClient,
  });

  try {
    const [poolBalance, totalSupply] = await Promise.all([
      tokenContract.read.poolBalance(),
      tokenContract.read.totalSupply(),
    ]);

    if (totalSupply === BigInt(0)) return "0";
    
    // Price = poolBalance / totalSupply
    return (Number(poolBalance) / Number(totalSupply)).toString();
  } catch (error) {
    console.error("Error fetching token price:", error);
    return "0.01"; // Fallback price
  }
};
