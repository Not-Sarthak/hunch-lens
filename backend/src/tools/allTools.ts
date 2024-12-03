import { createAndFundWalletTool } from "./coinbase-tools/createAndFundWalletTool.js";
import { deployErc20Tool } from "./deployERC20Tool.js";
import { retrieveCastTool } from "./farcaster-tools/analyzeCastTool.js";
import { getBalanceTool } from "./getBalance.js";
import { getWalletAddressTool } from "./getWalletAddressTool.js";
import { sendTransactionTool } from "./sendTransactionTool.js";

export interface ToolConfig<T = any> {
    definition: {
        type: 'function';
        function: {
            name: string;
            description: string;
            parameters: {
                type: 'object';
                properties: Record<string, unknown>;
                required: string[];
            };
        };
    };
    handler: (args: T) => Promise<any>;
};

export const tools: Record<string, ToolConfig> = {
    // Add Tools Here

    // FARCASTER_READ
    get_cast_data: retrieveCastTool,

    // READ
    get_balance: getBalanceTool,
    get_wallet_address: getWalletAddressTool,

    // WRITE
    send_transaction: sendTransactionTool,
    deploy_erc20: deployErc20Tool,

    // COINBASE TOOLS
    create_and_fund_wallet: createAndFundWalletTool
}