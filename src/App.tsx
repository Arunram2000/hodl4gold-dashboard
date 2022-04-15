import React from "react";
import { Route, Routes } from "react-router-dom";

import { ConnectWallet, Dashboard } from "./pages";
import { Header } from "./components";
import { useEagerConnect } from "./hooks/useEagerconnect";
import { useWeb3React } from "@web3-react/core";

const App: React.FC = () => {
  useEagerConnect();
  const { active } = useWeb3React();
<<<<<<< HEAD
  console.log(active)
=======

>>>>>>> 214cd0d89bcb337b4e2a925cf0daa6501f36831b
  return (
    <div className="app">
      <Header />
      <Routes>
        {active ? (
          <Route path="/" element={<Dashboard />} />
        ) : (
          <Route path="/" element={<ConnectWallet />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
