// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's

import { Token } from "@uniswap/sdk-core";

// Addresses

export const POOL_FACTORY_CONTRACT_ADDRESS =
  "0x33128a8fC17869897dcE68Ed026d694621f6FDfD";
export const QUOTER_CONTRACT_ADDRESS =
  "0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a";
export const SWAP_ROUTER_ADDRESS = "0x2626664c2603336E57B271c5C0b26F421741e481";
export const WETH_CONTRACT_ADDRESS =
  "0x4200000000000000000000000000000000000006";

// Currencies and Tokens

const BASE_CHAIN_ID = 8453;

export const WETH_TOKEN = new Token(
  BASE_CHAIN_ID,
  "0x4200000000000000000000000000000000000006",
  18,
  "WETH",
  "Wrapped Ether"
);

export const USDC_TOKEN = new Token(
  BASE_CHAIN_ID,
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  6,
  "USDC",
  "USD//C"
);

// ABI's

export const ERC20_ABI = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",
  "function approve(address _spender, uint256 _value) returns (bool)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

export const WETH_ABI = [
  // Wrap ETH
  "function deposit() payable",

  // Unwrap ETH
  "function withdraw(uint wad) public",
];

// Transactions

export const MAX_FEE_PER_GAS = 100000000000;
export const MAX_PRIORITY_FEE_PER_GAS = 100000000000;
export const TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER = 2000;
