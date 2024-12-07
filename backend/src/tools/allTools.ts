import { registerBasenameTool } from "./coinbase-tools/baseNameTool.js";
import { createAndFundWalletTool } from "./coinbase-tools/createAndFundWalletTool.js";
import { deployErc20Tool } from "./deployERC20Tool.js";
import { retrieveCastTool } from "./farcaster-tools/analyzeCastTool.js";
import { getBalanceTool } from "./getBalance.js";
import { getWalletAddressTool } from "./getWalletAddressTool.js";
import { sendTransactionTool } from "./sendTransactionTool.js";
import { entryExitTool } from "./trading-tools/entryExitTool.js";
import { retrieveTweetTool } from "./tweet-tools/analyzeTweetTool.js";

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

    // SOCIAL_ANALYSIS
    get_cast_data: retrieveCastTool,
    get_tweet_data: retrieveTweetTool,

    // TRADING_TOOLS
    analyze_entry_exit: entryExitTool,

    // READ
    get_balance: getBalanceTool,
    get_wallet_address: getWalletAddressTool,

    // WRITE
    send_transaction: sendTransactionTool,
    deploy_erc20: deployErc20Tool,

    // COINBASE TOOLS
    create_and_fund_wallet: createAndFundWalletTool,
    register_basename: registerBasenameTool, 
}