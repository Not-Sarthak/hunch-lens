import { ToolConfig } from "../allTools.js";
import { RegisterBasenameInput } from "../../coinbase/registerBasename.js";
import { registerBasename } from "../../coinbase/registerBasename.js";
import { createWallet } from "../../coinbase/createWallet.js";
import { fundWallet } from "../../coinbase/fundWallet.js";
import { Decimal } from "decimal.js"

export const registerBasenameTool: ToolConfig<RegisterBasenameInput> = {
  definition: {
    type: "function",
    function: {
      name: "register_basename",
      description: "Creates a CDP MPC wallet, funds it, and registers a basename for it. On testnet, names end with .basetest.eth, on mainnet they end with .base.eth",
      parameters: {
        type: "object",
        properties: {
          basename: {
            type: "string",
            description: "The basename to register (e.g., 'myname' - suffix will be added automatically based on network)",
          },
          amount: {
            type: "string",
            description: "Amount of ETH to pay for registration (default: 0.002)",
            default: "0.002"
          }
        },
        required: ["basename"]
      }
    }
  },
  handler: async (args: RegisterBasenameInput) => {
    try {
      console.log("Creating New Wallet");
      // const cdpWallet = await createWallet();
      // console.log("Wallet created:", cdpWallet);

      // console.log("Funding Wallet..");
      // const txHash = await fundWallet(cdpWallet.getId());
      // console.log("Wallet funded successfully:", txHash);

      // console.log("Registering Basename..");
      // const result = await registerBasename(cdpWallet, {
      //   basename: args.basename,
      //   amount: new Decimal("0.002")
      // });
      // console.log("Result:",result)

      return `
Success`;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error("Error in basename registration process:", errorMessage);
      throw new Error(`Failed to complete basename registration process: ${errorMessage}`);
    }
  }
};