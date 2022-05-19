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
  totalBalance: number;
  latestEvents: {
    eventId: any;
    startTime: number;
    endTime: number;
    winningNumber: number;
  }[];
}

export interface IEventInfo {
  eventId: string;
  startTime: number;
  endTime: number;
  winningNumber: number;
}

export const getUserAllowance = async (
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

  const userAllowance = await tokenContract.allowance(
    address,
    LOTTO_ADDRESS[chainId]
  );
  const val = userAllowance.toString();
  return Number(ethers.utils.formatUnits(val, "gwei"));
};

export const IncreaseUserAllowance = async (
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

  const allowanceValue = ethers.utils
    .parseUnits("100000000000000000", "gwei")
    .toString();

  const tx = await tokenContract.increaseAllowance(
    LOTTO_ADDRESS[chainId],
    allowanceValue
  );
  await tx.wait();
  await sleep();
};

export const buyTicket = async (
  address: string,
  provider: any,
  chainId: number,
  lotteryNumberList: number[]
) => {
  try {
    const etherProvider = new ethers.providers.Web3Provider(provider);
    const signer = etherProvider.getSigner(address);
    const lottoContract = new ethers.Contract(
      LOTTO_ADDRESS[chainId],
      lottoAbi,
      signer
    );

    const tx = await lottoContract.joinEvent(lotteryNumberList);
    await tx.wait();

    await sleep();
    window.location.reload();
    return {
      data: await getCurrentEventInfo(address, provider, chainId),
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
  chainId: number,
  eventId: string
) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const lottoContract = new ethers.Contract(
    LOTTO_ADDRESS[chainId],
    lottoAbi,
    signer
  );

  const eventUserList = await lottoContract.getEventUserList(eventId);

  const data: IEventUserList[] = eventUserList.map((userList) => {
    return {
      user: userList.user.toString(),
      randomNumber: userList.randomno.toString(),
      amount: ethers.utils.formatEther(userList.amount.toString()).toString(),
    };
  });

  return data;
};

export const getEventInfo = async (
  address: string,
  provider: any,
  chainId: number,
  eventId: string
) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const lottoContract = new ethers.Contract(
    LOTTO_ADDRESS[chainId],
    lottoAbi,
    signer
  );

  const eventInfo = await lottoContract.getEventInfo(eventId);

  return {
    eventId: eventInfo[0].toString(),
    startTime: Number(eventInfo[1].toString()) * 1000,
    endTime: Number(eventInfo[2].toString()) * 1000,
    winningNumber: Number(eventInfo[4].toString()),
  };
};

export const getLastestEventInfo = async (
  address: string,
  provider: any,
  chainId: number,
  currentEventId: number
) => {
  let eventInfoLists: IEventInfo[] = [];
  let eventIds: number[] = [];

  if (currentEventId < 5) {
    for (let i = 0; i < currentEventId; i++) {
      eventIds.push(i);
    }
    eventInfoLists = await Promise.all(
      eventIds.map(async (_, index) => {
        return await getEventInfo(address, provider, chainId, String(index));
      })
    );

    return eventInfoLists;
  }

  const lastEvent = currentEventId - 1;
  const startingEvent = lastEvent - 5;

  for (let i = startingEvent; i <= lastEvent; i++) {
    eventIds.push(i);
  }

  return await Promise.all(
    eventIds.map(async (id) =>
      getEventInfo(address, provider, chainId, String(id))
    )
  );
};

export const getCurrentEventInfo = async (
  address: string,
  provider: any,
  chainId: number
) => {
  try {
    const etherProvider = new ethers.providers.Web3Provider(provider);
    const signer = etherProvider.getSigner(address);
    const lottoContract = new ethers.Contract(
      LOTTO_ADDRESS[chainId],
      lottoAbi,
      signer
    );

    const eventInfo = await lottoContract.getCurrentEventInfo();
    const totalBalance = await lottoContract.totalBalance();

    const data = await getEventUserList(
      address,
      provider,
      chainId,
      eventInfo[0].toString()
    );

    const currentEventId = Number(eventInfo[0].toString());

    const latestEvents = await getLastestEventInfo(
      address,
      provider,
      chainId,
      currentEventId
    );

    return {
      data: {
        eventId: eventInfo[0].toString(),
        startTime: Number(eventInfo[1].toString()) * 1000,
        endTime: Number(eventInfo[2].toString()) * 1000,
        eventUserList: data.reverse(),
        totalBalance: Number(ethers.utils.formatEther(totalBalance.toString())),
        latestEvents,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

export const getRecentWinners = async (
  address: string,
  provider,
  chainId: number
) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const lottoContract = new ethers.Contract(
    LOTTO_ADDRESS[chainId],
    lottoAbi,
    signer
  );
  const eventInfo = await lottoContract.getCurrentEventInfo();
  const currentEventId = Number(eventInfo[0].toString());

  if (currentEventId === 0) {
    return {
      winningNumber: 0,
      winnersList: [],
    };
  }

  const eventId = String(currentEventId - 1);

  const eventData = await getEventInfo(address, provider, chainId, eventId);

  const data = await getEventUserList(address, provider, chainId, eventId);

  const filteredData = data.filter((f) => Number(f.amount) !== 0);

  return {
    winningNumber: eventData.winningNumber,
    winnersList: [
      ...filteredData.sort((a, b) => Number(b.amount) - Number(a.amount)),
    ],
  };
};

export const getTicketFee = async (
  address: string,
  provider,
  chainId: number
) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const lottoContract = new ethers.Contract(
    LOTTO_ADDRESS[chainId],
    lottoAbi,
    signer
  );

  const ticketFee = await lottoContract.ticketfee();
  const fee = ethers.utils.formatEther(ticketFee.toString());

  return Number(fee);
};
