import { ethers } from "ethers";

import tokenAbi from "./abis/tokenAbi.json";

import { TOKEN_ADDRESS } from "./constants/address";

export const getUserTokenBalance = async (address: string, provider: any) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const tokenContract = new ethers.Contract(TOKEN_ADDRESS, tokenAbi, signer);

  const userAllowance = await tokenContract.balanceOf(address);
  const val = userAllowance.toString();
  return Number(ethers.utils.formatEther(val));
};
