import React from "react";
import { Route, Routes } from "react-router-dom";

import { ConnectWallet, Dashboard } from "./pages";
import { Header } from "./components";
import { useEagerConnect } from "./hooks/useEagerconnect";
import { useWeb3React } from "@web3-react/core";

const App: React.FC = () => {
  useEagerConnect();
  const { account } = useWeb3React();
  return (
    <div className="app">
      <Header />
      <Routes>
        {account ? (
          <Route path="/" element={<Dashboard />} />
        ) : (
          <Route path="/" element={<ConnectWallet />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
