import { utils } from "ethers";
import { getDividendContract } from "./getDividendContract"
import { realworldUint } from "./toRealWorldAmount";

export const getTotalSupply = async()=>{
    const contract = getDividendContract();
    const totalSupply = await contract.totalSupply();
    const unformated = utils.formatUnits(totalSupply,9);
    const formated = realworldUint(unformated);
    return formated
}

