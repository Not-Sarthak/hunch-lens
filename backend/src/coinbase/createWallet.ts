import { Wallet } from "@coinbase/coinbase-sdk";
import { initializeSDK } from "./initializeSdk.js";

export interface WalletDetails {
  walletId: string;
  address: string;
}

export async function createWallet(): Promise<any> {
  try {
    initializeSDK();

    const wallet = await Wallet.create();
    const walletId = wallet.getId();
    const address = await wallet.getDefaultAddress();

    if (!walletId || !address) {
      throw new Error("Failed to retrieve wallet ID or address.");
    }

    return wallet;
  } catch (error) {
    console.error("Error creating wallet:", error);
    throw error;
  }
}
