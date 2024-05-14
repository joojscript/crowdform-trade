import { SupportedChainId } from "@uniswap/widgets";
import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";

const baseMainnet = {
  id: `0x${SupportedChainId.BASE.toString(16)}`,
  label: "Base Mainnet",
  token: "ETH",
  rpcUrl: "https://mainnet.base.org",
};

const localBaseFork = {
  id: "0x0",
  label: "Local Mainnet Fork (BASE)",
  token: "ETH",
  rpcUrl: "http://localhost:8545",
};

export const chains = [baseMainnet, localBaseFork];

const wallets = [injectedModule()];

const appMetadata = {
  name: "Uniswap Widget Example",
  icon: "<svg>My App Icon</svg>",
  description:
    "Example showcasing how to integrate web3-onboard with uniswap widget.",
  recommendedInjectedWallets: [
    { name: "MetaMask", url: "https://metamask.io" },
    { name: "Coinbase", url: "https://wallet.coinbase.com/" },
  ],
};

// initialize Onboard

export default init({
  wallets,
  chains,
  appMetadata,
});
