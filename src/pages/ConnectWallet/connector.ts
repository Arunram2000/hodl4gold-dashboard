import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";

export const Injected = new InjectedConnector({
  supportedChainIds: [56],
});

const switchRequest = (chainId = 56) => {
  const { ethereum } = window as any;
  return ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: ethers.utils.hexlify(56) }],
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
