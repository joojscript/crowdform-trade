import { ethers } from "ethers";
import "./style.css";

// Constants:

const TOKEN_LIST_ENDPOINT = "https://tokens.uniswap.org/";
const BASE_MAINNET_CHAIN_ID = 8453;
const BASE_MAINNET_RPC_ENDPOINT = "https://mainnet.base.org";

const widgetUrl = "https://uni-widget-iframe.vercel.app";
const iframe: any = document.getElementById("iframe");

// ensure that you have MetaMask installed.
const provider = new ethers.providers.Web3Provider((window as any).ethereum);

const reloadWidget = () => {
  iframe.contentWindow?.postMessage(
    {
      target: "swapWidget",
      method: "reload",
    },
    widgetUrl
  );
};

const updateSetting = (key: string, value: string | number) => {
  iframe.contentWindow?.postMessage(
    {
      target: "swapWidget",
      method: "setConfig",
      payload: { [key]: value },
    },
    widgetUrl
  );
};

provider.send("eth_requestAccounts", []).then(() => {
  iframe.addEventListener("load", async (_) => {
    const tokenList = await (await fetch(TOKEN_LIST_ENDPOINT)).json();
    const baseChainTokenList = tokenList.tokens.filter(
      (token) => token.chainId == BASE_MAINNET_CHAIN_ID
    );

    iframe.contentWindow.postMessage(
      {
        target: "swapWidget",
        method: "setConfig",
        payload: {
          jsonRpcEndpoint: BASE_MAINNET_RPC_ENDPOINT,
          tokenList: baseChainTokenList,
        },
      },
      widgetUrl
    );
  });

  window.addEventListener("message", (e) => {
    if (e.origin !== widgetUrl || !e.data.jsonrpc || !provider.getSigner())
      return;

    const request = e.data.method;

    provider.send(request?.method, request?.params || []).then((result) => {
      iframe.contentWindow!.postMessage(
        {
          jsonrpc: e.data.jsonrpc,
          id: e.data.id,
          result,
        },
        widgetUrl
      );
    });
  });

  (provider.provider as any).on("accountsChanged", () => reloadWidget());
  (provider.provider as any).on("networkChanged", (chainId: string) => {
    const network = `0x${Number(chainId).toString(16)}`;
    updateSetting("defaultChainId", network);
    reloadWidget();
  });

  iframe.setAttribute("src", widgetUrl);
});
