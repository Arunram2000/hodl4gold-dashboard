import React, { useContext, useState } from "react";
import "./Home.scss";

import Prizes from "./Prizes/Prizes";
import Events from "./Events/Events";
import Leaderboard from "./Leaderboard/Leaderboard";
import DenUserContextProvider, {
  DenUserContext,
} from "../../store/context/DenUserContext";

import { ReactComponent as UserIcon } from "../../assets/icons/user.svg";
import DenAccount from "../../components/Modals/DenAccountModal";
import { useWeb3React } from "@web3-react/core";

const tabs = [
  {
    value: 1,
    label: "Contests",
  },
  {
    value: 2,
    label: "Leaderboard",
  },
  {
    value: 3,
    label: "Prizes",
  },
];

const User = () => {
  const { userData, isLoading } = useContext(DenUserContext);
  const [modal, setModal] = useState(false);

  if (isLoading || !userData?.username) return null;

  return (
    <>
      <div className="user_header">
        <div className="user_header-left" onClick={() => setModal(true)}>
          <div title="click here to see profile">
            <UserIcon />
          </div>
          <h5>@{userData?.username}</h5>
        </div>
        <p>
          <b>{userData?.rewards}</b> Points
        </p>
      </div>
      <DenAccount modal={modal} handleClose={() => setModal(false)} />
    </>
  );
};

const Den: React.FC = () => {
  const [activeTab, setActiveTab] = useState(1);
  const { account } = useWeb3React();

  return (
    <DenUserContextProvider>
      <div className="den">
        <User />
        <div className="tabs-header">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={tab.value === activeTab ? "active" : undefined}
              onClick={() => setActiveTab(tab.value)}
            >
              <p>{tab.label}</p>
            </div>
          ))}
        </div>
        <div className="tabs-content">
          {activeTab === 1 && <Events account={account} />}
          {activeTab === 2 && <Leaderboard />}
          {activeTab === 3 && <Prizes />}
        </div>
      </div>
    </DenUserContextProvider>
  );
};

export default Den;
