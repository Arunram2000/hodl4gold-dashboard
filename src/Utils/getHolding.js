import { getDividendContract } from "./getDividendContract"

export const getHoldings=async(address)=>{
    const contract = getDividendContract();
    const holdings = await contract.balanceOf(address);
    return holdings
}