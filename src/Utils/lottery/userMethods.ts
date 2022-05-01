import { ethers } from "ethers";

import tokenAbi from "./abis/tokenAbi.json";

import { TOKEN_ADDRESS } from "./constants/address";

export const getUserTokenBalance = async (
  address: string,
  provider: any,
  chainId: number
) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const tokenContract = new ethers.Contract(
    TOKEN_ADDRESS[chainId],
    tokenAbi,
    signer
  );

  const userBalance = await tokenContract.balanceOf(address);
  const val = userBalance.toString();

  return Number(ethers.utils.formatEther(val));
};
