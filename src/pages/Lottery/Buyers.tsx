import { useWeb3React } from "@web3-react/core";
import React from "react";
import { FingerPrint } from "../../components/Icons";
import { getSlicedValue } from "../../Utils/lottery/helpers";
import { IEventUserList } from "../../Utils/lottery/methods";

const Buyers: React.FC<{ currentEventInfo: IEventUserList[] }> = ({
  currentEventInfo,
}) => {
  const { account } = useWeb3React();
  const userPurchases = currentEventInfo.filter(
    (f) => f.user.toLocaleLowerCase() === account.toLocaleLowerCase()
  );

  const renderUserTickets = (
    <section className={"leaderboard"}>
      <h3 className="mb-30 text-center">Your recent purchases </h3>
      {!userPurchases.length ? (
        <div>
          <h5 style={{ textAlign: "center" }}>No purchases yet</h5>
        </div>
      ) : (
        <div className={"leaderboardWrapper"}>
          {userPurchases.slice(0, 20).map((val, i) => (
            <div key={i.toString()} className={"buyers_card"}>
              <div className={"buyers_card_details"}>
                <FingerPrint />
                <div>
                  <p>
                    [{i + 1}] - {getSlicedValue(val.user)}
                  </p>
                  <span> Wallet address</span>
                </div>
              </div>
              <div className={"buyers_card_transfers"}>
                <p>{val.randomNumber}</p>
                <span>Number</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );

  const renderRecentBuyers = (
    <section className={"leaderboard"}>
      <h3 className="mb-30 text-center">Recent Buyers </h3>
      {!currentEventInfo.length ? (
        <div>
          <h5 style={{ textAlign: "center" }}>No Buyers yet</h5>
        </div>
      ) : (
        <div className={"leaderboardWrapper"}>
          {currentEventInfo.slice(0, 20).map((val, i) => (
            <div key={i.toString()} className={"buyers_card"}>
              <div className={"buyers_card_details"}>
                <FingerPrint />
                <div>
                  <p>
                    [{i + 1}] - {getSlicedValue(val.user)}
                  </p>
                  <span> Wallet address</span>
                </div>
              </div>
              <div className={"buyers_card_transfers"}>
                <p>{val.randomNumber}</p>
                <span>Number</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );

  return (
    <div className="leaderboard_grid">
      {renderRecentBuyers}
      {renderUserTickets}
    </div>
  );
};

export default Buyers;
