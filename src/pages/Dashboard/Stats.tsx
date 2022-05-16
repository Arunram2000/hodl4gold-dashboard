import React, { useEffect, useState } from "react";

// import heart from "../../assets/icons/heart.svg";
import line from "../../assets/icons/line.svg";
// import dollar from "../../assets/icons/dollar.svg";
// import cup from "../../assets/icons/cup.svg";
import dec from "../../assets/icons/dec.svg";
import inc from "../../assets/icons/inc.svg";
// import money_circle from "../../assets/icons/money-dollar-circle-line.svg";
import lock_line from "../../assets/icons/lock-2-line.svg";
// import pending_rewards from "../../assets/icons/pending_rewards.svg";
// import bar_horz_line from "../../assets/icons/bar-chart-horizontal-line.svg";
import coins_line from "../../assets/icons/coins-line.svg";
import wallet_line from "../../assets/icons/wallet-line.svg";
import time_line from "../../assets/icons/time-line.svg";
import funds_line from "../../assets/icons/funds-line.svg";
import { getPrice } from "../../Utils/getH4GPrice";
import { getHoldings } from "../../Utils/getHolding";
import {
  totalClaimed,
  remainingRewards,
} from "../../Utils/getTotalRewardsClaimed";
import { Contract } from "ethers";
import { getDividendContract } from "../../Utils/getDividendContract";
import { useWeb3React } from "@web3-react/core";
import abi from "../../Utils/constants/H4G_ABI.json";
// import { realworldUint } from "../../Utils/toRealWorldAmount";

type IStatsCardProps = {
  title: string;
  value: string;
  token: string;
  icon: string;
  prefix_icon: string;
  label?: {
    name: string;
    variant?: "error" | "success" | "warning" | "info";
  };
  trade?: "inc" | "dec";
  func?: () => Promise<void>;
};

const StatsCard: React.FC<IStatsCardProps> = ({
  title,
  label,
  prefix_icon,
  token,
  value,
  trade,
  icon,
  func,
}) => {
  return (
    <div className="stats_card">
      <div className="stats_card-header">
        <section>
          <p>{title}</p>
          {label && (
            <span onClick={() => func()} className={label.variant}>
              {label.name}
            </span>
          )}
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
          {prefix_icon}
          {new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 14,
          }).format(Number(value))}
          &nbsp;{token}
        </h2>
      </div>
    </div>
  );
};

const Stats: React.FC = () => {
  const [price, setPrice] = useState("");
  const [holdings, setHoldings] = useState("");
  const [totalRewards, setTotalRewards] = useState("");
  const [pendingRewards, setPendingRewards] = useState("");
  const [totalValue, setTotalValue] = useState("")

  const { account, library } = useWeb3React();

  const claim = async () => {
    if (Number(pendingRewards) > 0) {
      const contract = getDividendContract();
      const newc = new Contract(contract.address, abi, library);

      //encoding data
      const data = newc.interface.encodeFunctionData("claim");

      const tx = {
        to: contract.address,
        data: data,
      };

      return library
        .getSigner()
        .estimateGas(tx)
        .then((estimate) => {
          const newtxn = {
            ...tx,
            gasLimit: estimate,
          };
          library
            .getSigner()
            .sendTransaction(newtxn)
            .then(() =>
              Promise.resolve(totalClaimed(account)).then((claims) =>
                setTotalRewards(String(claims))
              )
            );
        });
    } else {
      window.alert("Nothing to claim");
      return;
    }
  };

  useEffect(() => {
    if (account) {
      Promise.resolve(getPrice()).then((price) => setPrice(price));
      Promise.resolve(getHoldings(account)).then((holds) => {
        setHoldings(holds);
      });
      Promise.resolve(totalClaimed(account)).then((claims) =>
        setTotalRewards(String(claims))
      );
      Promise.resolve(remainingRewards(account)).then((remains) =>
        setPendingRewards(remains)
      );
      
    }
  }, [account]);

  useEffect(() => {
    if (price && holdings) {
      Promise.resolve(Number(price) * Number(holdings)).then((totalValue) => {
        setTotalValue(totalValue.toFixed(2).toString());
      });
    }
  });

  return (
    <div className="stats mb-30">
      <div className="row stats_wrapper">
        <div className="col-md-6">
          <StatsCard
            title="LIVE H4G PRICE"
            prefix_icon="$"
            value={price}
            token={"USD"}
            icon={line}
            //trade={"dec"}
          />
        </div>
        <div className="col-md-6">
          <StatsCard
            title="Total H4G Value ($)"
            prefix_icon="$"
            value={totalValue}
            token={"USD"}
            icon={funds_line}
            //trade={"dec"}
          />
        </div>
        <div className="col-md-6">
          <StatsCard
            title="My Staked H4G (Coming Soon)"
            prefix_icon=""
            value="0"
            token={"H4G"}
            icon={lock_line}
            //trade={"inc"}
          />
        </div>
        <div className="col-md-6">
          <StatsCard
            title="My holding balance"
            prefix_icon=""
            value={holdings}
            token={"H4G"}
            icon={wallet_line}
          />
        </div>
      </div>
      <div className="row stats_wrapper">
        <div className="col-md-6">
          <StatsCard
            title="MY TOTAL REWARDS"
            prefix_icon=""
            value={totalRewards}
            token={"BUSD"}
            icon={coins_line}
            //trade={"inc"}
          />
        </div>
        <div className="col-md-6">
          <StatsCard
            title="MY PENDING REWARDS"
            prefix_icon=""
            value={pendingRewards}
            token={"BUSD"}
            icon={time_line}
            label={{
              name: "claim",
              variant: "success",
            }}
            func={claim}
          />
        </div>
      </div>
      <hr/>
    </div>
  );
};

export default Stats;
