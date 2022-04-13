import React, { useEffect } from "react";

import "./ConnectWallet.scss";
import metamask from "../../assets/images/metamask.png";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { Injected, switchNetwork } from "./connector";

const ConnectWallet: React.FC = () => {
  const { activate, error } = useWeb3React();

  useEffect(() => {
    if (error && error instanceof UnsupportedChainIdError) switchNetwork();
  }, [error]);

  return (
    <div className="backdrop">
      <div className="wallet_modal">
        <h1 className="mb-20">Connect Wallet</h1>
        <div className="wallet" onClick={() => activate(Injected,(err)=>{if(err && err instanceof UnsupportedChainIdError){switchNetwork()}})}>
          <img src={metamask} alt="metamask" />
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
