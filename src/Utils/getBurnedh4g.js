import { utils } from "ethers";
import { getDividendContract } from "./getDividendContract";

export const getBurnedh4g = async () => {
  const contract = getDividendContract();
  const burned = await contract.balanceOf(
    "0x000000000000000000000000000000000000dead"
  );
  return utils.formatUnits(burned, 9);
};
