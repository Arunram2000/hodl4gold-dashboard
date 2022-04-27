import React from "react";
import { Route, Routes } from "react-router-dom";

import { ConnectWallet, Dashboard } from "./pages";
import { Header } from "./components";
import { useEagerConnect } from "./hooks/useEagerconnect";
import { useWeb3React } from "@web3-react/core";
import Farm from "./pages/Stake/farm";

const App: React.FC = () => {
  useEagerConnect();
  const { active } = useWeb3React();

  return (
    <div className="app">
      <Header />
      <Routes>
        {active ? (
          <Route path="/" element={<Dashboard />} />
        ) : (
          <Route path="/" element={<ConnectWallet />} />
        )}
         <Route path="/stake" element={<Farm /> } />
      </Routes>
    </div>
  );
};

export default App;
