import React from "react";

import "./Lottery.scss";

import Lottery from "./Lottery";
import Leaderboard from "./Leaderboard";
import LotteryUserContextProvider from "../../store/context/LotteryUserContext";

const Home: React.FC = () => {
  return (
    <LotteryUserContextProvider>
      <main className={"home"}>
        <section className="mx pad">
          <div className={"homeWrapper"}>
            <Lottery />
          </div>
          <div className="mb-30"></div>
          <Leaderboard />
        </section>
      </main>
    </LotteryUserContextProvider>
  );
};

export default Home;
