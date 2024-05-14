import { CurrentConfig } from "./config";
import { getProvider, getWalletAddress } from "./libs/providers";
import { createTrade, executeTrade } from "./libs/trading";
import { getCurrencyBalance } from "./libs/wallet";

async function main() {
  const provider = getProvider();
  const address = getWalletAddress();
  if (!address || !provider) {
    return;
  }

  const one = await getCurrencyBalance(
    provider,
    address,
    CurrentConfig.tokens.in
  );

  const two = await getCurrencyBalance(
    provider,
    address,
    CurrentConfig.tokens.out
  );

  console.log({ one, two });

  const uncheckedTrade = await createTrade();

  console.log({ uncheckedTrade });

  const result = await executeTrade(uncheckedTrade);

  console.log(
    `Trade executed, check your wallet for the transaction.\nBlock: ${result.receipt?.blockHash}`
  );
}

main();
