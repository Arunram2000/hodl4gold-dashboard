import React from "react";

import "./Leaderboard.scss";
import { useGetLeaderboardQuery } from "../../../store/services/eventsApi";
import LeaderboardTable from "./LeaderboardTable";
import moment from "moment";

const Leaderboard: React.FC = () => {
  const { isFetching, isError, data } = useGetLeaderboardQuery({});

  if (isError) {
    return (
      <div className="loader" style={{ minHeight: "300px" }}>
        <h3>!Oops.. something went wrong</h3>
      </div>
    );
  }

  const renderFetching = (
    <div className="loader" style={{ minHeight: "300px" }}>
      <h3>Loading...</h3>
    </div>
  );

  return (
    <div className="leaderboard">
      {isFetching ? (
        renderFetching
      ) : (
        <>
          <div className="leaderboard_wrapper mb-30">
            <h3 className="mb-15">Today’s winners</h3>
            <div>
              <LeaderboardTable leaderboardData={data?.oneDayResult} />
            </div>
          </div>
          <div className="leaderboard_wrapper mb-30">
            <h3 className="mb-15">
              Winners for the month of {moment().format("MMMM")} 2022
            </h3>
            <div>
              <LeaderboardTable leaderboardData={data?.oneMonthResult} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Leaderboard;
