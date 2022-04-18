import { utils } from "ethers";
import { getDividendContract } from "./getDividendContract";

export const getTotalSupply = async () => {
  const contract = getDividendContract();
  const totalSupply = await contract.totalSupply();
  const unformated = utils.formatUnits(totalSupply, 9);
  return unformated;
};
