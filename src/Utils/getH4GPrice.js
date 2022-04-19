import {
  ChainId,
  Token,
  WETH,
  Fetcher,
  Route,
  Trade,
  TradeType,
  TokenAmount,
} from "@pancakeswap/sdk";
import { JsonRpcProvider } from "@ethersproject/providers";
import { RPC_URL } from "./config";
import { utils, BigNumber } from "ethers";

const HODL4GOLD = new Token(
  ChainId.MAINNET,
  "0xE8c4bEce93084D649fB630886b5332942b643BB9",
  9
);

//Token 2 initiate
const DAI = new Token(
  ChainId.MAINNET,
  "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
  18
);

export const getPrice = async () => {
  const provider = new JsonRpcProvider(RPC_URL);
  const HODL4GOLDPair = await Fetcher.fetchPairData(
    HODL4GOLD,
    WETH[ChainId.MAINNET],
    provider
  );
  const DAIWETHPair = await Fetcher.fetchPairData(
    DAI,
    WETH[ChainId.MAINNET],
    provider
  );
  const route = new Route([HODL4GOLDPair, DAIWETHPair], HODL4GOLD, DAI);
  // console.log(route.midPrice.toSignificant(9)); // 202.081
  // console.log(route.midPrice.invert().toSignificant(9)); // 0.00494851

  const trade = new Trade(
    route,
    new TokenAmount(HODL4GOLD, utils.parseUnits("1", 9)),
    TradeType.EXACT_INPUT
  );

  console.log(Number(trade.executionPrice.toSignificant(2)) * 10 ** 5);

  return String(Number(route.midPrice.toSignificant(9)) * 10 ** 5);
};
