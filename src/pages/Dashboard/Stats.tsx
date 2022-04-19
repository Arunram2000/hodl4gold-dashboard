import React, { useEffect, useState } from "react";

import heart from "../../assets/icons/heart.svg";
import line from "../../assets/icons/line.svg";
import dollar from "../../assets/icons/dollar.svg";
// import cup from "../../assets/icons/cup.svg";
import dec from "../../assets/icons/dec.svg";
import inc from "../../assets/icons/inc.svg";
import pending_rewards from "../../assets/icons/pending_rewards.svg";
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
  func?: () => Promise<void>;
};

const StatsCard: React.FC<IStatsCardProps> = ({
  title,
  label,
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
  const [holdings, setHoldings] = useState("");
  const [totalRewards, setTotalRewards] = useState("");
  const [pendingRewards, setPendingRewards] = useState("");

  const { account, library } = useWeb3React();

  //const account = "0x354ec4719169a3d0b695ecec1953d3d869cd8f26";

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
          library.getSigner().sendTransaction(newtxn);
        });
    } else {
      window.alert("stake to claim");
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
          func={claim}
        />
      </div>
    </div>
  );
};

export default Stats;
