import { ethers } from "ethers";
import h4gabi from "./abis/h4gtoken.json";
import stakeabi from "./abis/h4gstake.json";

import { STAKING_ADDRESS, TOKEN_ADDRESS } from "./address";

export const getStakingContract = (
  provider,
  address: string,
  chainId: number
) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const h4gstake = new ethers.Contract(
    STAKING_ADDRESS[chainId],
    stakeabi,
    signer
  );

  return h4gstake;
};

export const getTokenBalance = async (
  provider,
  address: any,
  chainId: number
) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const h4gTokenContract = new ethers.Contract(
    TOKEN_ADDRESS[chainId],
    h4gabi,
    signer
  );

  const userBalanceInHex = await h4gTokenContract.balanceOf(address);
  const userBalance = userBalanceInHex.toString();
  const formatEther = ethers.utils.formatUnits(userBalance, "gwei");

  return Number(formatEther);
};

export const getUserAllowance = async (
  provider,
  address: string,
  chainId: number
) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const h4gTokenContract = new ethers.Contract(
    TOKEN_ADDRESS[chainId],
    h4gabi,
    signer
  );

  const userAllowanceInHex = await h4gTokenContract.allowance(
    address,
    STAKING_ADDRESS[chainId]
  );
  const userAllowance = userAllowanceInHex.toString();
  const formatEther = ethers.utils.formatUnits(userAllowance, "gwei");
  return Number(formatEther);
};

export const getUserDetails = async (
  provider,
  address: string,
  chainId: number
) => {
  const h4gstake = getStakingContract(provider, address, chainId);

  const userDetails = await h4gstake.getUserDetails(address);
  const formatTotalStaked = ethers.utils.formatUnits(
    userDetails[0].toString(),
    "gwei"
  );
  const formatBusdReward = ethers.utils.formatEther(userDetails[3].toString());
  const formatH4gReward = ethers.utils.formatUnits(
    userDetails[4].toString(),
    "gwei"
  );

  return {
    totalStaked: Number(formatTotalStaked),
    busdReward: Number(formatBusdReward),
    h4gReward: formatH4gReward ? Number(formatH4gReward) : 0,
  };
};

export const getRewardAmount = async (
  provider,
  address: string,
  chainId: number,
  userStaked: number
) => {
  try {
    const h4gstake = getStakingContract(provider, address, chainId);

    const rewards = await h4gstake.rewardPerBlockAddress(address);
    const formatEther = ethers.utils.formatUnits(rewards.toString(), "gwei");

    return Number(formatEther);
  } catch (error) {
    return 0;
  }
};

export const getUserWithdrawAmount = async (
  provider,
  address: string,
  chainId: number
) => {
  try {
    const etherProvider = new ethers.providers.Web3Provider(provider);
    const signer = etherProvider.getSigner(address);
    const h4gstake = new ethers.Contract(
      STAKING_ADDRESS[chainId],
      stakeabi,
      signer
    );

    const amount = await h4gstake.withdrawAmount(address);
    const val = amount.toString().split(",");
    const withdrawAmount = Number(ethers.utils.formatUnits(val[0], "gwei"));
    const withdrawFee = Number(ethers.utils.formatUnits(val[1], "gwei"));

    return { withdrawAmount, withdrawFee };
  } catch (error) {
    return { withdrawAmount: 0, withdrawFee: 0 };
  }
};
