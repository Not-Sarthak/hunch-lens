import { http, createPublicClient } from "viem";
import { mainnet, baseSepolia } from "viem/chains";

export const publicClient = [
  createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
  createPublicClient({
    chain: baseSepolia,
    transport: http(),
  }),
];
