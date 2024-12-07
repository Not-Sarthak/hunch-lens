import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
  ConnectWalletText,
} from "@coinbase/onchainkit/wallet";
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import React from "react";

export default function Header({ text }: { text?: string | React.ReactNode }) {
  return (
    <div className="flex justify-end">
      <div className="flex space-x-2">
        <Wallet>
          <ConnectWallet>
            <ConnectWalletText className="font-light">
              {text ? text : "Connect Wallet"}
            </ConnectWalletText>
            <Avatar className="w-6 h-6" />
            <Name className="text-white" />
          </ConnectWallet>
          <WalletDropdown>
            <Identity className="px-4 pb-2" hasCopyAddressOnClick={true}>
              <Avatar />
              <Name />
              <Address />
              <EthBalance />
            </Identity>
            <WalletDropdownLink
              icon="wallet"
              href="https://keys.coinbase.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wallet
            </WalletDropdownLink>
            <WalletDropdownDisconnect />
          </WalletDropdown>
        </Wallet>
      </div>
    </div>
  );
}
