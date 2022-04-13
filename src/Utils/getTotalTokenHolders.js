import { getDividendContract } from "./getDividendContract"


export const totalTokenHolders = async()=>{
    const contract = getDividendContract();
    const totalTokenHolders = await contract.getNumberOfDividendTokenHolders();
    return totalTokenHolders.toNumber();
}