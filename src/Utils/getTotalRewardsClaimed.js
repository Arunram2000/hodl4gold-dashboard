import { getDividendContract } from "./getDividendContract"
import { utils } from "ethers";

const contract = getDividendContract();

export const totalClaimed = async(address)=> {
    const info = await contract.getAccountDividendsInfo(address);
    const claimed = utils.formatEther(info[4]) - utils.formatEther(info[3])
    return claimed;
}

export const remainingRewards = async(address)=>{
    const info = await contract.getAccountDividendsInfo(address);
    const claimed = utils.formatEther(info[3])
    return claimed;
}

export const secondsLeft =async (address) =>{
    const info = await contract.getAccountDividendsInfo(address);
    const secondsLeft = info[7].toNumber();
    return secondsLeft;
}