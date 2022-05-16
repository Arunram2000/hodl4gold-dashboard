import { getDividendContract } from "./getDividendContract"
import { utils } from "ethers";


export const totalDividendDistributed = async() =>{
    const contract = getDividendContract();
    const dividendDistributed = await contract.getTotalDividendsDistributed();
    return utils.formatEther(dividendDistributed)
}