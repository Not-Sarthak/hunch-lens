import { ToolConfig } from "../allTools.js";
import { createWallet } from "../../coinbase/createWallet.js";
import { fundWallet } from "../../coinbase/fundWallet.js";

export const createAndFundWalletTool: ToolConfig = {
    definition: {
      type: "function",
      function: {
        name: "create_and_fund_wallet",
        description: "Creates a wallet and funds it using the Coinbase CDP faucet.",
        parameters: {
          type: "object",
          properties: {
            network: {
              type: "string",
              description: "The network for wallet creation. Default: Base Sepolia.",
            },
          },
          required: [],
        },
      },
    },
    handler: async () => {
      try {
        // Create a wallet
        const walletDetails = await createWallet();
        console.log("Wallet created:", walletDetails);
  
        // Fund the wallet
        const txHash = await fundWallet(walletDetails.walletId);
        console.log("Wallet funded successfully.");
  
        // Format the response string
        const response = `WalletId: ${walletDetails.walletId}\nAddress: ${walletDetails.address}\nHash: ${txHash}\nAmount transfer is 0.01 ETH always from faucet`;
  
        return response;
      } catch (error) {
        console.error("Error creating and funding wallet:", error);
        throw error;
      }
    },
  };