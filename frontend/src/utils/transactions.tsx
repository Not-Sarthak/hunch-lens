"use client";

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
import { baseSepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain: baseSepolia,
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
    chain: baseSepolia,
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
  contractAddress: `0x${string}`;
  approvalAddress: `0x${string}`;
  amount: string;
}) => {
  const walletClient = createWalletClient({
    chain: baseSepolia,
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

export const buyPost = async ({
  contractAddress,
  amount,
}: {
  contractAddress: `0x${string}`;
  amount: string;
}) => {
  const walletClient = createWalletClient({
    chain: baseSepolia,
    transport: custom(window.ethereum),
  });
  const accounts = await walletClient.getAddresses();
  const walletAddress = accounts[0];

  const tokenContract = getContract({
    address: contractAddress,
    abi: tokenAbi,
    client: walletClient,
  });

  const tx = await tokenContract.write.mint({
    account: walletAddress,
    value: BigInt(amount),
  });
  console.log("Token bought transaction:", tx);
  return tx;
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
