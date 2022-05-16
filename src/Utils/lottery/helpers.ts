export const sleep = (ms = 2000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getSplitedValue = (values: string) => values.split(",");

// export const generateRandomNumber = (arr: any[]): any => {
//   const rn = Math.floor(100000 + Math.random() * 900000);
//   if (arr.some((a) => a.ticketNo === rn)) {
//     return generateRandomNumber(arr);
//   }

//   return rn;
// };

export const generateRandomNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const getSlicedValue = (value: string, sliceValue = 6) => {
  return `${value.slice(0, sliceValue)}...${value.slice(
    value.length - sliceValue
  )}`;
};

const switchRequest = (chainId = 4) => {
  const { ethereum } = window as any;
  return ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: "0x4" }],
  });
};

export const switchNetwork = async () => {
  const { ethereum } = window as any;
  if (ethereum) {
    try {
      await switchRequest();
    } catch (error) {
      console.log(error);
    }
  }
};
