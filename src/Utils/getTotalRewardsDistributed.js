import { getDividendContract } from "./getDividendContract"
import { utils } from "ethers";
import { realworldUint } from "./toRealWorldAmount";

export const totalDividendDistributed = async() =>{
    const contract = getDividendContract();
    const dividendDistributed = await contract.getTotalDividendsDistributed();
    return realworldUint(utils.formatEther(dividendDistributed))
}