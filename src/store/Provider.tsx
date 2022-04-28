import React, { ReactNode } from "react";

import TransactionContextProvider from "./context/TransactionContext";
import WalletContextProvider from "./context/WalletContext";

const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <TransactionContextProvider>
      <WalletContextProvider>{children}</WalletContextProvider>
    </TransactionContextProvider>
  );
};

export default Provider;
