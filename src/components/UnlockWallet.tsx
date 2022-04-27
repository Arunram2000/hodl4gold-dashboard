import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import React, { useContext, useState } from "react";

import  useUpdateEffect from "../hooks/useUpdateEffect";
import { WalletContext } from "../store/context/WalletContext";
import { switchNetwork } from "../Utils/connector";

import "./Button/Button.scss";

const Button: React.FC = () => {
  const { error } = useWeb3React();
  const { setOpenWallet } = useContext(WalletContext);
  const [wrongNetwork, setWrongNetwork] = useState(false);

  useUpdateEffect(() => {
    if (error instanceof UnsupportedChainIdError) {
      return setWrongNetwork(true);
    }

    return setWrongNetwork(false);
  }, [error]);

  return (
    <button
      className={wrongNetwork ? "btn-error" : "btn-primary"}
      onClick={wrongNetwork ? () => switchNetwork() : () => setOpenWallet(true)}
    >
      {wrongNetwork ? "wrong Network" : "connect wallet"}
    </button>
  );
};

export default Button;
