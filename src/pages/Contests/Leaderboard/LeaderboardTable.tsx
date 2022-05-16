import React from "react";

const LeaderboardTable: React.FC<{ leaderboardData: any[] }> = ({
  leaderboardData,
}) => {
  return (
    <div className="leaderboard_table">
      {!leaderboardData?.length ? (
        <div className="loader" style={{ minHeight: "100px" }}>
          <p>No Participants yet</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr className="leaderboard_table-header">
              <th>Wallet Address</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData?.slice(0, 5)?.map((data, i) => {
              return (
                <tr key={i.toString()} className="leaderboard_table-body">
                  <td>
                    <p>{`${data?.address?.slice(0, 8)}...${data?.address?.slice(
                      data?.address?.length - 8
                    )}`}</p>
                  </td>
                  <td>
                    <b>{data?.reward}</b>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaderboardTable;
