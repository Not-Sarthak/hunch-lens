import { encodeFunctionData, namehash } from "viem";
import { Decimal } from "decimal.js";
import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";
import {
  L2_RESOLVER_ADDRESS_MAINNET,
  L2_RESOLVER_ADDRESS_TESTNET,
  BASENAMES_REGISTRAR_CONTROLLER_ADDRESS_MAINNET,
  BASENAMES_REGISTRAR_CONTROLLER_ADDRESS_TESTNET,
  REGISTRATION_DURATION,
  L2_RESOLVER_ABI,
  REGISTRAR_ABI,
} from '../const/basenameDetails.js';

/**
 * Interface for Basename registration input
 */
export interface RegisterBasenameInput {
  basename: string;
  amount?: any;
}

/**
 * Creates registration arguments for Basenames.
 *
 * @param baseName - The Basename (e.g., "example.base.eth" or "example.basetest.eth").
 * @param addressId - The Ethereum address.
 * @param isMainnet - True if on mainnet, False if on testnet.
 * @returns Formatted arguments for the register contract method.
 */
function createRegisterContractMethodArgs(
  baseName: string,
  addressId: string,
  isMainnet: boolean,
): object {
  const l2ResolverAddress = isMainnet ? L2_RESOLVER_ADDRESS_MAINNET : L2_RESOLVER_ADDRESS_TESTNET;
  const suffix = isMainnet ? ".base.eth" : ".basetest.eth";

  const addressData = encodeFunctionData({
    abi: L2_RESOLVER_ABI,
    functionName: "setAddr",
    args: [namehash(baseName), addressId],
  });
  const nameData = encodeFunctionData({
    abi: L2_RESOLVER_ABI,
    functionName: "setName",
    args: [namehash(baseName), baseName],
  });

  const registerArgs = {
    request: [
      baseName.replace(suffix, ""),
      addressId,
      REGISTRATION_DURATION,
      l2ResolverAddress,
      [addressData, nameData],
      true,
    ],
  };

  return registerArgs;
}

/**
 * Registers a Basename for the agent.
 *
 * @param wallet - The wallet to register the Basename with.
 * @param args - The input arguments for the action.
 * @returns Confirmation message with the basename.
 */
export async function registerBasename(
  wallet: Wallet,
  args: RegisterBasenameInput,
): Promise<string> {
  const addressId = (await wallet.getDefaultAddress()).getId();
  const isMainnet = wallet.getNetworkId() === Coinbase.networks.BaseMainnet;

  const suffix = isMainnet ? ".base.eth" : ".basetest.eth";
  if (!args.basename.endsWith(suffix)) {
    args.basename += suffix;
  }

  const registerArgs = createRegisterContractMethodArgs(args.basename, addressId, isMainnet);

  try {
    const contractAddress = isMainnet
      ? BASENAMES_REGISTRAR_CONTROLLER_ADDRESS_MAINNET
      : BASENAMES_REGISTRAR_CONTROLLER_ADDRESS_TESTNET;

    const invocation = await wallet.invokeContract({
      contractAddress,
      method: "register",
      args: registerArgs,
      abi: REGISTRAR_ABI,
      amount: new Decimal(args.amount),
      assetId: "eth",
    });

    await invocation.wait();
    return `Successfully registered basename ${args.basename} for address ${addressId}`;
  } catch (error) {
    return `Error registering basename: Error: ${error}`;
  }
}