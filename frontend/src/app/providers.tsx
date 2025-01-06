"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import {
  ApolloProvider as BaseApolloProvider,
} from "@apollo/client";
import { config } from "../config";
import { ConnectKitProvider } from "connectkit";
import { client } from "../graphql/client";
const queryClient = new QueryClient();

export function Providers(props: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <BaseApolloProvider client={client}>
          <ConnectKitProvider>{props.children}</ConnectKitProvider>
        </BaseApolloProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
