import { deployErc20Tool } from "./deployERC20Tool.js";
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

    // READ
    get_balance: getBalanceTool,
    get_wallet_address: getWalletAddressTool,

    // WRITE
    send_transaction: sendTransactionTool,
    deploy_erc20: deployErc20Tool,
}