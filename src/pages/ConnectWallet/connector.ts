import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { ethers } from "ethers";
import { RPC_URL } from "../../Utils/config.js";

export const Injected = new InjectedConnector({
  supportedChainIds: [56, 97],
});

export const walletConnect = new WalletConnectConnector({
  rpc: { 56: "https://bsc-dataseed3.binance.org/" },
  qrcode: true,
  pollingInterval: 10000,
});

const switchRequest = async (chainId = 56) => {
  const { ethereum } = window as any;
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: ethers.utils.hexlify(56) }],
    });
  } catch (err: any) {
    if (err.code === 4902) {
      await ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: ethers.utils.hexlify(56),
              chainName: "Binance SmartChain",
              rpcUrls: [RPC_URL] /* ... */,
            },
          ],
        })
        .then(async () => {
          return await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: ethers.utils.hexlify(56) }],
          });
        });
    }
  }
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
