"use client";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { useMemo } from "react";
import { http, createConfig } from "wagmi";
import { NEXT_PUBLIC_WC_PROJECT_ID } from "./config";
import { chains } from "@lens-network/sdk/viem";

export function useWagmiConfig() {
  const projectId = NEXT_PUBLIC_WC_PROJECT_ID ?? "";
  if (!projectId) {
    const providerErrMessage =
      "To connect to all Wallets you need to provide a NEXT_PUBLIC_WC_PROJECT_ID env variable";
    throw new Error(providerErrMessage);
  }

  return useMemo(() => {
    const connectors = connectorsForWallets(
      [
        {
          groupName: "Recommended Wallet",
          wallets: [coinbaseWallet],
        },
        {
          groupName: "Other Wallets",
          wallets: [rainbowWallet, metaMaskWallet],
        },
      ],
      {
        appName: "hunch",
        projectId,
      }
    );

    const wagmiConfig = createConfig({
      chains: [chains.testnet],
      multiInjectedProviderDiscovery: false,
      connectors,
      ssr: true,
      transports: {
        [chains.testnet.id]: http(),
      },
    });

    return wagmiConfig;
  }, [projectId]);
}
