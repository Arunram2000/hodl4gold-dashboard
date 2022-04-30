import React, { useState } from "react";
import "./Home.scss";

import Prizes from "./Prizes/Prizes";
import Events from "./Events/Events";
import Leaderboard from "./Leaderboard/Leaderboard";
import DenUserContextProvider from "../../store/context/DenUserContext";

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

const Den: React.FC = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <DenUserContextProvider>
      <div className="den">
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
          {activeTab === 1 && <Events />}
          {activeTab === 2 && <Leaderboard />}
          {activeTab === 3 && <Prizes />}
        </div>
      </div>
    </DenUserContextProvider>
  );
};

export default Den;
