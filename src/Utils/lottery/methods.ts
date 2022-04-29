import { ethers } from "ethers";

import lottoAbi from "./abis/lottoAbi.json";
import tokenAbi from "./abis/tokenAbi.json";

import { LOTTO_ADDRESS, TOKEN_ADDRESS } from "./constants/address";
import { sleep } from "./helpers";

export interface IEventUserList {
  user: string;
  randomNumber: string;
  amount: string;
}

export interface ICurrentEvent {
  eventId: string;
  startTime: number;
  endTime: number;
  eventUserList: IEventUserList[];
}

export const getUserAllowance = async (address: string, provider: any) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const tokenContract = new ethers.Contract(TOKEN_ADDRESS, tokenAbi, signer);

  const userAllowance = await tokenContract.allowance(address, LOTTO_ADDRESS);
  const val = userAllowance.toString();
  return Number(ethers.utils.formatUnits(val, "gwei"));
};

export const IncreaseUserAllowance = async (address: string, provider: any) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const tokenContract = new ethers.Contract(TOKEN_ADDRESS, tokenAbi, signer);

  const allowanceValue = ethers.utils
    .parseUnits("100000000000000000", "gwei")
    .toString();

  const tx = await tokenContract.increaseAllowance(
    LOTTO_ADDRESS,
    allowanceValue
  );
  await tx.wait();
  await sleep();
};

export const buyTicket = async (
  address: string,
  provider: any,
  lotteryNumber: number
) => {
  try {
    const etherProvider = new ethers.providers.Web3Provider(provider);
    const signer = etherProvider.getSigner(address);
    const lottoContract = new ethers.Contract(LOTTO_ADDRESS, lottoAbi, signer);
    const tx = await lottoContract.joinEvent(lotteryNumber);
    await tx.wait();

    await sleep();
    return {
      data: await getCurrentEventInfo(address, provider),
    };
  } catch (error: any) {
    return {
      error: {
        message: error.message,
      },
    };
  }
};

export const getEventUserList = async (
  address: string,
  provider: any,
  eventId: string
) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const lottoContract = new ethers.Contract(LOTTO_ADDRESS, lottoAbi, signer);

  const eventUserList = await lottoContract.getEventUserList(eventId);

  const data: IEventUserList[] = eventUserList.map((userList) => {
    return {
      user: userList.user.toString(),
      randomNumber: userList.randomno.toString(),
      amount: ethers.utils
        .formatUnits(userList.amount.toString(), "gwei")
        .toString(),
    };
  });

  return data;
};

export const getCurrentEventInfo = async (address: string, provider: any) => {
  try {
    const etherProvider = new ethers.providers.Web3Provider(provider);
    const signer = etherProvider.getSigner(address);
    const lottoContract = new ethers.Contract(LOTTO_ADDRESS, lottoAbi, signer);
    const eventInfo = await lottoContract.getCurrentEventInfo();
    const data = await getEventUserList(
      address,
      provider,
      eventInfo[0].toString()
    );
    return {
      data: {
        eventId: eventInfo[0].toString(),
        startTime: Number(eventInfo[1].toString()) * 1000,
        endTime: Number(eventInfo[2].toString()) * 1000,
        eventUserList: data,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

export const getRecentWinners = async (address: string, provider) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const lottoContract = new ethers.Contract(LOTTO_ADDRESS, lottoAbi, signer);
  const eventInfo = await lottoContract.getCurrentEventInfo();
  const currentEventId = Number(eventInfo[0].toString());

  if (currentEventId === 0) {
    return [];
  }

  const data = await getEventUserList(
    address,
    provider,
    String(currentEventId - 1)
  );

  const filteredData = data.filter((f) => Number(f.amount) !== 0);

  return [...filteredData.sort((a, b) => Number(b.amount) - Number(a.amount))];
};
