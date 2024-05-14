import { useEffect, useState } from "react";

import { SupportedChainId, SwapWidget } from "@uniswap/widgets";

import "@uniswap/widgets/fonts.css";

import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";

import { TOKEN_LIST } from "../constants";
import styles from "../styles/Home.module.css";

const USDC = TOKEN_LIST[0].address; // USDC contract address for Base Network

// Hexadecimal representation of chainId for BASE Mainnet:
const BASE_CHAIN_ID = SupportedChainId.BASE.toString(
  16
) as unknown as SupportedChainId;

export default function App() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();

  useEffect(() => {
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, "any"));
    } else {
      setProvider(undefined);
    }
  }, [wallet]);

  // The connect wallet function which will be based to the Uniswap component below.
  const connectWallet = () => {
    connect();
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Uniswap Swap Widget</h1>

        <div className={styles.demo}>
          <div className={styles.widget}>
            <SwapWidget
              data-testid="swap-widget"
              defaultChainId={BASE_CHAIN_ID}
              tokenList={TOKEN_LIST}
              provider={provider}
              // When the Uniswap connect wallet button gets hit
              // the function gets called. We'll hook this up to
              // our connect wallet method from web3-onboard.
              onConnectWalletClick={connectWallet}
              defaultInputTokenAddress="NATIVE"
              defaultInputAmount="1"
              defaultOutputTokenAddress={USDC}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
