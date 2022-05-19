import React from "react";
import { CATEGORY } from "../../constants/lotteryRewardsCategory";

type IRewardsTabel = {
  totalPrizePool: number | undefined;
};

const RewardTable: React.FC<IRewardsTabel> = ({ totalPrizePool }) => {
  return (
    <div className="lottery_reward_table">
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Description</th>
            <th>Rewards</th>
          </tr>
        </thead>
        <tbody>
          {CATEGORY.map((amt, index) => {
            return (
              <tr key={index.toString()}>
                <td>{index + 1}</td>
                <td>{amt.description}</td>
                <td>
                  {totalPrizePool
                    ? new Intl.NumberFormat("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 4,
                      }).format((amt.value / 100) * totalPrizePool)
                    : 0}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RewardTable;
