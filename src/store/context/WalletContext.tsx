import React, { createContext, ReactNode, useState } from "react";
import WalletModal from "../../components/Modals/WalletModal";

interface IWalletContext {
  openWallet: boolean;
  setOpenWallet: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WalletContext = createContext<IWalletContext>({
  openWallet: false,
  setOpenWallet: () => {},
});

const WalletContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [openWallet, setOpenWallet] = useState(false);

  const handleClose = () => setOpenWallet(false);

  return (
    <WalletContext.Provider value={{ openWallet, setOpenWallet }}>
      {children}
      <WalletModal modal={openWallet} handleClose={handleClose} />
    </WalletContext.Provider>
  );
};

export default WalletContextProvider;
