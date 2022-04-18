import React, { useEffect, useState } from "react";

import holders from "../../assets/icons/holders.svg";
import distributedlogo from "../../assets/icons/distributed.svg";
import supply from "../../assets/icons/supply.svg";
import claimed from "../../assets/icons/claimed.svg";
import { totalTokenHolders } from "../../Utils/getTotalTokenHolders";
import { getTotalSupply } from "../../Utils/getCirculatingSupply";
import { totalDividendDistributed } from "../../Utils/getTotalRewardsDistributed";
import { getBurnedh4g } from "../../Utils/getBurnedh4g";
import { realworldUint } from "../../Utils/toRealWorldAmount";

type ITokenStatsCardProps = {
  title: string;
  value: any;
  icon: string;
  // label?: {
  //   value: string;
  //   trade?: "inc" | "dec";
  // };
};

const TokenStatsCard: React.FC<ITokenStatsCardProps> = ({
  title,
  // label,
  value,
  icon,
}) => {
  return (
    <div className="token_card">
      <div className="token_card-header">
        <p>{title}</p>
        <img src={icon} alt="trade" width={40} height={40} />
      </div>
      <h2>{value}</h2>
      {/* <div className="flex">
        <span className={label?.trade ?? "inc"}>{label?.value} %</span>
        <p>vs. previous month</p>
      </div> */}
    </div>
  );
};

const TokenStats: React.FC = () => {
  const [totalHolds, setholders] = useState(0);
  const [totalSupply, setTotalSupply] = useState("0");
  const [distributed, setDistributed] = useState("0");
  const [totalBurns, setts] = useState("0");

  useEffect(() => {
    Promise.resolve(totalTokenHolders()).then((holders) => setholders(holders));
    Promise.resolve(getTotalSupply()).then(async (supply) => {
      const totalBurns = await getBurnedh4g();
      const ts = Number(supply) - Number(totalBurns);

      setts(realworldUint(totalBurns));
      setTotalSupply(realworldUint(ts));
    });
    Promise.resolve(totalDividendDistributed()).then((dis) =>
      setDistributed(dis)
    );
  }, []);
  return (
    <div className="token_stats">
      {/* <div className="token_controls">
        <div className="timer">
          <strong>next payout starting in (under dev)</strong>
          <div>
            <p>
              <img src="" alt="" />
            </p>
            <section>
              <h3>xx h : xx m : xx s </h3>
              <p>processing | 0%</p>
            </section>
          </div>
        </div>
      </div> */}
      <div className="token_wrapper">
        <TokenStatsCard
          title="Total Holders"
          icon={holders}
          value={totalHolds}
          // label={{
          //   value: "16.24",
          //   trade: "inc",
          // }}
        />
        <TokenStatsCard
          title="Total Circulating Supply"
          icon={supply}
          value={totalSupply}
          // label={{
          //   value: "16.24",
          //   trade: "inc",
          // }}
        />
        <TokenStatsCard
          title="Total Rewards Distributed"
          icon={distributedlogo}
          value={distributed}
          // label={{
          //   value: "16.24",
          //   trade: "inc",
          // }}
        />
        <TokenStatsCard
          title="Total H4G Burned"
          icon={claimed}
          value={totalBurns}
          // label={{
          //   value: "16.24",
          //   trade: "inc",
          // }}
        />
      </div>
    </div>
  );
};

export default TokenStats;
