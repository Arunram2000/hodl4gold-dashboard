import { getDividendContract } from "./getDividendContract";
import { utils } from "ethers";
import { realworldUintshort } from "./toRealWorldAmount";

export const getHoldings=async(address)=>{
    const contract = getDividendContract();
    const holdings = await contract.balanceOf(address);
    return utils.formatUnits(holdings,9);
}