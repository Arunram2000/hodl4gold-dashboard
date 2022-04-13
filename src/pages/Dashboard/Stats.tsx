import React, { useEffect, useState } from "react";

import heart from "../../assets/icons/heart.svg";
import line from "../../assets/icons/line.svg";
import dollar from "../../assets/icons/dollar.svg";
import cup from "../../assets/icons/cup.svg";
import dec from "../../assets/icons/dec.svg";
import inc from "../../assets/icons/inc.svg";
import pending_rewards from "../../assets/icons/pending_rewards.svg";
import { getPrice } from "../../Utils/getH4GPrice";
import {getHoldings} from "../../Utils/getHolding"
import {totalClaimed,remainingRewards} from "../../Utils/getTotalRewardsClaimed"
import { useWeb3React } from "@web3-react/core";

type IStatsCardProps = {
  title: string;
  value: string;
  token: string;
  icon: string;
  label?: {
    name: string;
    variant?: "error" | "success" | "warning" | "info";
  };
  trade?: "inc" | "dec";
};

const StatsCard: React.FC<IStatsCardProps> = ({
  title,
  label,
  token,
  value,
  trade,
  icon,
}) => {
  return (
    <div className="stats_card">
      <div className="stats_card-header">
        <section>
          <p>{title}</p>
          {label && <span className={label.variant}>{label.name}</span>}
        </section>
        {trade && (
          <img
            src={trade === "dec" ? dec : inc}
            alt="trade"
            width={18}
            height={18}
          />
        )}
      </div>
      <div className="stats_card-content">
        <img src={icon} alt="icon" width={40} height={40} />
        <h2>
          {new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 8,
          }).format(Number(value))}
          &nbsp;{token}
        </h2>
      </div>
    </div>
  );
};

const Stats: React.FC = () => {
  const [price, setPrice] = useState("");
  const [holdings,setHoldings] = useState("")
  const [totalRewards,setTotalRewards] = useState("")
  const [pendingRewards,setPendingRewards] = useState("")

  const {account} = useWeb3React()

  useEffect(() => {
    Promise.resolve(getPrice()).then((price) => setPrice(price));
    Promise.resolve(getHoldings(account)).then((holds)=>{setHoldings(holds)});
    Promise.resolve(totalClaimed(account)).then((claims)=>setTotalRewards(String(claims)))
    Promise.resolve(remainingRewards(account)).then((remains)=>setPendingRewards(remains))
  }, []);
  return (
    <div className="stats mb-30">
      <div className="stats_wrapper">
        <StatsCard
          title="LIVE h4g pRICE"
          value={price}
          token={"USD"}
          icon={line}
          trade={"dec"}
        />
        <StatsCard
          title="holding balance"
          value={holdings}
          token={"H4G"}
          icon={heart}
        />
        <StatsCard
          title="DAILY AVERAGE EARNING(under Dev)"
          value={"0"}
          token={"H4G"}
          icon={cup}
          label={{
            name: "calculate",
            variant: "info",
          }}
        />
        <StatsCard
          title="MY TOTAL REWARDS"
          value={totalRewards}
          token={"BUSD"}
          icon={dollar}
          trade={"inc"}
          label={{
            name: "Reinvest",
            variant: "warning",
          }}
        />
        <StatsCard
          title="MY PENDING REWARDS"
          value={pendingRewards}
          token={"BUSD"}
          icon={pending_rewards}
          label={{
            name: "claim",
            variant: "success",
          }}
        />
      </div>
    </div>
  );
};

export default Stats;
