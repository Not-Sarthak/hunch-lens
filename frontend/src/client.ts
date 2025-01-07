import { http, createPublicClient } from "viem";
import { mainnet, baseSepolia } from "viem/chains";
import { chains } from "@lens-network/sdk/viem";

export const publicClient = [
  createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
  createPublicClient({
    chain: baseSepolia,
    transport: http(),
  }),
  createPublicClient({
    chain: chains.testnet,
    transport: http(),
  })
];
