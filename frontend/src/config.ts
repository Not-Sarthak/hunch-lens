import { chains } from '@lens-network/sdk/viem';
import { getDefaultConfig } from 'connectkit';
import { createConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';

export const NEXT_PUBLIC_WC_PROJECT_ID=process.env.NEXT_PUBLIC_WC_PROJECT_ID;

export const config = createConfig(
  getDefaultConfig({
    appName: 'ConnectKit Next.js demo',
    chains: [chains.testnet],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  })
);

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
