import { ethers } from "ethers";
import h4gabi from "./abis/h4gtoken.json";
import stakeabi from "./abis/h4gstake.json";
import { STAKING_ADDRESS, TOKEN_ADDRESS } from "./address";
import { getUserAllowance } from "./userMethods";
import { IContractData } from "../../store/types";

const AMOUNT = "10000000000000000000000";

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

export const countDecimals = (value: number) => {
  if (Math.floor(value.valueOf()) === value.valueOf()) return 1;
  const decimals = value.toString().split(".")[1].length || 1;

  return Math.pow(10, decimals);
};

export const getTotalStaked = async (
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

  const totalStaked = await h4gstake.totalStaked();
  const formatEther = ethers.utils.formatUnits(totalStaked.toString(), "gwei");

  return Number(formatEther);
};

export const setApprove = async (
  provider,
  address: string,
  chainId: number,
  amount = AMOUNT
) => {
  try {
    const etherProvider = new ethers.providers.Web3Provider(provider);
    const signer = etherProvider.getSigner(address);
    const h4g = new ethers.Contract(TOKEN_ADDRESS[chainId], h4gabi, signer);

    const tx = await h4g.increaseAllowance(STAKING_ADDRESS[chainId], amount);
    await tx.wait();
    await sleep();

    return {
      data: await getUserAllowance(provider, address, chainId),
    };
  } catch (err: any) {
    return {
      error: {
        code: err?.code,
        message: err?.message,
      },
    };
  }
};

export const setStake = async (
  provider,
  address,
  chainId: number,
  amount: string
) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const h4gstake = new ethers.Contract(
    STAKING_ADDRESS[chainId],
    stakeabi,
    signer
  );

  const parseEther = ethers.utils.parseUnits(amount, "gwei").toString();
  const estimateGas = await h4gstake.estimateGas.stake(
    amount.toString(),
   );
  const tx = await h4gstake.stake(parseEther,{
    gasLimit: estimateGas,
  });
  await tx.wait();
};

export const setCompound = async (
  provider,
  address: string,
  chainId: number,
  userStaked: number
) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const h4gstake = new ethers.Contract(
    STAKING_ADDRESS[chainId],
    stakeabi,
    signer
  );

  const tx = await h4gstake.compound();
  await tx.wait();
};

export const setHarvest = async (
  provider,
  address: string,
  chainId: number,
  userStaked: number
) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const h4gstake = new ethers.Contract(
    STAKING_ADDRESS[chainId],
    stakeabi,
    signer
  );

  const tx = await h4gstake.harvest();
  await tx.wait();
};

export const getContractDetails = async (
  provider,
  address: string,
  chainId: number
): Promise<IContractData> => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const h4gstake = new ethers.Contract(
    STAKING_ADDRESS[chainId],
    stakeabi,
    signer
  );

  const apy = await h4gstake.getApy();
  const endtime = await h4gstake.endTime();
  const withdrawFee = await h4gstake.getWithdrawDetails();
  const withdrawFeeDividens = withdrawFee.toString()?.split(",");
  const formattedWithdrawFee =
    Number(withdrawFeeDividens[0]) / Number(withdrawFeeDividens[1]);

  const depositFee = await h4gstake.getDepositDetails();
  const depositFeeDividens = depositFee.toString()?.split(",");
  const formatteddepositFee =
    Number(depositFeeDividens[0]) / Number(depositFeeDividens[1]);

  const fundsStaking = Number(
    ethers.utils.formatUnits(apy[0].toString(), "gwei")
  );
  const totalStaked = Number(
    ethers.utils.formatUnits(apy[1].toString(), "gwei")
  );

  const apyValue = (fundsStaking / totalStaked) * 100;
  const formatedApy = isFinite(apyValue) ? apyValue : 0;

  return {
    endTime: Number(endtime.toString()) * 1000,
    apy: formatedApy,
    withdrawFee: isNaN(formattedWithdrawFee) ? 0 : formattedWithdrawFee * 100,
    depositFee: isNaN(formatteddepositFee) ? 0 : formatteddepositFee * 100,
  };
};

export const withdraw = async (provider, address: string, chainId: number) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const h4gstake = new ethers.Contract(
    STAKING_ADDRESS[chainId],
    stakeabi,
    signer
  );
  const estimateGas = await h4gstake.estimateGas.withdraw();
  const tx = await h4gstake.withdraw({
    gasLimit: estimateGas,
  });
  await tx.wait();
};

export const claimBUSD = async (provider, address: string, chainId: number) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const h4gstake = new ethers.Contract(
    STAKING_ADDRESS[chainId],
    stakeabi,
    signer
  );

  const tx = await h4gstake.claimBusd();
  await tx.wait();
};
