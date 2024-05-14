import { describe, it } from "@jest/globals";
import { CurrentConfig } from "../config";
import { TransactionState } from "./providers";
import { createTrade, executeTrade, getTokenTransferApproval } from "./trading";

// TODO: Implement tests for connected wallet
// -> Will require a mock for the wallet connection (could be done in many ways).
// -> not in the current scope.

jest.mock("ethers", () => ({
  ethers: {
    ...jest.requireActual("ethers").ethers,
    Contract: class {
      token0 = jest.fn();
      token1 = jest.fn();
      fee = jest.fn();
      tickSpacing = jest.fn();
      liquidity = jest.fn().mockResolvedValue(1);
      slot0 = jest.fn().mockResolvedValue([1, 2]);
    },
    Wallet: class {
      provider = {
        call: jest
          .fn()
          .mockResolvedValue(
            "0x0000000000000000000000000000000000000000000000000000000000000000"
          ),
      };
    },
    providers: {
      Web3Provider: class {},
      JsonRpcProvider: class {},
    },
  },
}));

jest.mock("@uniswap/v3-sdk", () => ({
  ...jest.requireActual("@uniswap/v3-sdk"),
  Pool: class {},
  Route: class {},
  SwapQuoter: {
    quoteCallParameters: jest.fn().mockResolvedValue({ calldata: {} }),
  },
  Trade: {
    createUncheckedTrade: jest.fn().mockResolvedValue({}),
  },
}));

describe("Trading", () => {
  it("should correctly create a trade", async () => {
    const result = await createTrade();
    expect(result).toBeDefined();
  });

  describe("executing the trade", () => {
    it("should fail without connection to a wallet", async () => {
      const trade = await createTrade();
      await expect(executeTrade(trade)).rejects.toThrow(
        "Cannot execute a trade without a connected wallet"
      );
    });
  });

  describe("Token transfer approval", () => {
    it("should fail without connection to a wallet", async () => {
      const token = CurrentConfig.tokens.in;
      const result = await getTokenTransferApproval(token);

      expect(result).toHaveProperty("status", TransactionState.Failed);
      expect(result).toHaveProperty("receipt", null);
    });
  });
});
