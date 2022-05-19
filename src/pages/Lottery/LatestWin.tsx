import moment from "moment";
import React from "react";

interface ILatest {
  latestEvents: {
    eventId: any;
    startTime: number;
    endTime: number;
    winningNumber: number;
  }[];
}

const LatestWin: React.FC<ILatest> = ({ latestEvents }) => {
  if (!latestEvents.length) return null;

  return (
    <div className="latestWin_list">
      <h4 style={{ textAlign: "center" }}>Recent Events</h4>
      <table>
        <thead>
          <th>Winning Number</th>
          <th>Event Ends</th>
        </thead>
        <tbody>
          {latestEvents.map((event, index) => {
            return (
              <tr key={index.toString()}>
                <td>{event.winningNumber}</td>
                <td>{moment(event.endTime).format("ll")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LatestWin;
