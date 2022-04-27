import { ethers } from "ethers";
import h4gabi from "./abis/h4gtoken.json";
import stakeabi from "./abis/h4gstake.json";

import { H4G_STAKING_ADDRESS, H4G_TOKEN_ADDRESS } from "./address";

export const getStakingContract = (provider, address: string) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const h4gstake = new ethers.Contract(H4G_STAKING_ADDRESS, stakeabi, signer);

  return h4gstake;
};

export const getTokenBalance = async (provider, address: any) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const h4gTokenContract = new ethers.Contract(
    H4G_TOKEN_ADDRESS,
    h4gabi,
    signer
  );

  const userBalanceInHex = await h4gTokenContract.balanceOf(address);
  const userBalance = userBalanceInHex.toString();
  const formatEther = ethers.utils.formatUnits(userBalance, "gwei");

  return Number(formatEther);
};

export const getUserAllowance = async (provider, address: string) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const h4gTokenContract = new ethers.Contract(
    H4G_TOKEN_ADDRESS,
    h4gabi,
    signer
  );

  const userAllowanceInHex = await h4gTokenContract.allowance(
    address,
    H4G_STAKING_ADDRESS
  );
  const userAllowance = userAllowanceInHex.toString();
  const formatEther = ethers.utils.formatUnits(userAllowance, "gwei");
  return Number(formatEther);
};

export const getUserDetails = async (provider, address: string) => {
  const h4gstake = getStakingContract(provider, address);

  const userDetails = await h4gstake.getUserDetails(address);
  const formatTotalStaked = ethers.utils.formatUnits(
    userDetails[0].toString(),
    "gwei"
  );
  const formatBusdReward = ethers.utils.formatEther(userDetails[3].toString());

  return {
    totalStaked: Number(formatTotalStaked),
    busdReward: Number(formatBusdReward),
  };
};

export const getRewardAmount = async (
  provider,
  address: string,
  userStaked: number
) => {
  try {
    const h4gstake = getStakingContract(provider, address);

    const rewards = await h4gstake.rewardPerBlockAddress(address);
    const formatEther = ethers.utils.formatUnits(rewards.toString(), "gwei");

    return Number(formatEther);
  } catch (error) {
    return 0;
  }
};

export const getUserWithdrawAmount = async (provider, address: string) => {
  try {
    const etherProvider = new ethers.providers.Web3Provider(provider);
    const signer = etherProvider.getSigner(address);
    const h4gstake = new ethers.Contract(H4G_STAKING_ADDRESS, stakeabi, signer);

    const amount = await h4gstake.withdrawAmount(address, 1000);
    const val = amount.toString().split(",");
    const withdrawAmount = Number(ethers.utils.formatUnits(val[0], "gwei"));
    const withdrawFee = Number(ethers.utils.formatUnits(val[1], "gwei"));

    return { withdrawAmount, withdrawFee };
  } catch (error) {
    return { withdrawAmount: 0, withdrawFee: 0 };
  }
};
