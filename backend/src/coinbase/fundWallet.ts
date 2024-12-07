import { Wallet } from "@coinbase/coinbase-sdk";
import { initializeSDK } from "../coinbase/initializeSdk.js";

export async function fundWallet(walletId: string): Promise<string> {
    try {
    initializeSDK();

    const wallet = await Wallet.fetch(walletId);
    if (!wallet) {
      throw new Error(`Wallet with ID ${walletId} not found.`);
    }

    const faucetTransaction = await wallet.faucet();
    await faucetTransaction.wait();

    console.log("Faucet transaction completed successfully.", faucetTransaction.getTransactionHash());
    const faucetTransactionAgain = await wallet.faucet();
    await faucetTransactionAgain.wait();

    return faucetTransaction.getTransactionHash();
  } catch (error) {
    console.error("Error funding wallet:", error);
    throw error;
  }
}