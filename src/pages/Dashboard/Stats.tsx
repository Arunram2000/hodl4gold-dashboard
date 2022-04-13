import React, { useEffect, useState } from "react";

import heart from "../../assets/icons/heart.svg";
import line from "../../assets/icons/line.svg";
import dollar from "../../assets/icons/dollar.svg";
import cup from "../../assets/icons/cup.svg";
import dec from "../../assets/icons/dec.svg";
import inc from "../../assets/icons/inc.svg";
import pending_rewards from "../../assets/icons/pending_rewards.svg";
import { getPrice } from "../../Utils/getH4GPrice";

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

  useEffect(() => {
    Promise.resolve(getPrice()).then((price) => setPrice(price));
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
          value={"00.07"}
          token={"USD"}
          icon={heart}
        />
        <StatsCard
          title="DAILY AVERAGE EARNING"
          value={"00.07"}
          token={"USD"}
          icon={cup}
          label={{
            name: "calculate",
            variant: "info",
          }}
        />
        <StatsCard
          title="MY TOTAL REWARDS"
          value={"00.07"}
          token={"USD"}
          icon={dollar}
          trade={"inc"}
          label={{
            name: "Reinvest",
            variant: "warning",
          }}
        />
        <StatsCard
          title="MY PENDING REWARDS"
          value={"00.07"}
          token={"USD"}
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
