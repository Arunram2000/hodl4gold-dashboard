import { useWeb3React } from "@web3-react/core";
import React, { useCallback, useEffect, useState } from "react";
import { FingerPrint } from "../../components/Icons";
import { getRecentWinners, IEventUserList } from "../../Utils/lottery/methods";
import { getSlicedValue } from "../../Utils/lottery/helpers";

const Leaderboard: React.FC = () => {
  const { account, library, chainId } = useWeb3React();

  const [currentEventInfo, setCurrentEventInfo] = useState<IEventUserList[]>(
    []
  );

  const handleGetEventData = useCallback(async () => {
    if (account) {
      try {
        setCurrentEventInfo(
          await getRecentWinners(account, library?.provider, chainId)
        );
      } catch (error) {
        console.log(error);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId]);

  useEffect(() => {
    handleGetEventData();
  }, [handleGetEventData]);

  return (
    <section className={"leaderboard"}>
      <h3 className="mb-30 text-center">Recent Lottery Winners </h3>
      {!currentEventInfo.length ? (
        <div>
          <h5 style={{ textAlign: "center" }}>No History Found</h5>
        </div>
      ) : (
        <div className={"leaderboardWrapper"}>
          {currentEventInfo.slice(0, 20).map((val, i) => (
            <div key={i.toString()} className={"leaderboardWrapper_card"}>
              <div className={"leaderboardWrapper_card_details"}>
                <FingerPrint />
                <div>
                  <p>
                    [{i + 1}] - {getSlicedValue(val.user)}
                  </p>
                  <span> Wallet address</span>
                </div>
              </div>
              <div className={"leaderboardWrapper_card_transfers"}>
                <p>
                  {new Intl.NumberFormat("en", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 6,
                  }).format(Number(val.amount))}{" "}
                  BUSD
                </p>
                <span>Earned</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Leaderboard;
