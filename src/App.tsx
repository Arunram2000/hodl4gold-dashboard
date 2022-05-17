import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import {
  ConnectWallet,
  Dashboard,
  Contests,
  Apps,
  Lottery,
  Farms,
} from "./pages";
import { Header } from "./components";
import { useEagerConnect } from "./hooks/useEagerconnect";
import { useWeb3React } from "@web3-react/core";

const App: React.FC = () => {
  useEagerConnect();
  const { active } = useWeb3React();

  return (
    <div className="app">
      <Header />
      <Routes>
        {active ? (
          <Fragment>
            <Route path="/" element={<Dashboard />} />
            <Route path="/farms" element={<Farms />} />
            <Route path="/lottery" element={<Lottery />} />
            <Route path="/contests" element={<Contests />} />
            <Route path="/apps" element={<Apps />} />
          </Fragment>
        ) : (
          <Route path="*" element={<ConnectWallet />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
