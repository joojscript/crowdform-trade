import { SupportedChainId, TokenInfo } from "@uniswap/widgets";

export const JSON_RPC_URL = "https://mainnet.base.org";

export const TOKEN_LIST: TokenInfo[] = [
  {
    chainId: SupportedChainId.BASE,
    name: "USDC",
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    decimals: 6,
    symbol: "USDC",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
  },
  {
    chainId: SupportedChainId.BASE,
    name: "Coinbase wETH",
    address: "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22",
    decimals: 18,
    symbol: "wETH",
  },
];
