import {InjectedConnector} from "@web3-react/injected-connector"
import {WalletConnectConnector} from "@web3-react/walletconnect-connector"
import {utils} from "ethers"

export const injected = new InjectedConnector({supportedChainIds: [56]})


export const Walletconnect = new WalletConnectConnector({
    rpc: {
      56: process.env.RPC_URL,
    },
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    pollingInterval: 12000,
  });
  
  const switchRequest = (id) => {
    const { ethereum } = window;
    return ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: utils.hexlify(id) }],
    });
  };
  
  export const switchNetwork = async (id) => {
    const { ethereum } = window;
    if (ethereum) {
      try {
        await switchRequest(id);
      } catch (error) {
        console.log(error);
      }
    }
  };