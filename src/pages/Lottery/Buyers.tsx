import { useWeb3React } from "@web3-react/core";
import React, { useCallback, useEffect, useState } from "react";
import { FingerPrint } from "../../components/Icons";
import { getSlicedValue } from "../../Utils/lottery/helpers";
import {
  getCurrentEventInfo,
  IEventUserList,
} from "../../Utils/lottery/methods";

const Buyers: React.FC = () => {
  const { account, library, chainId } = useWeb3React();
  const [currentEventInfo, setCurrentEventInfo] = useState<IEventUserList[]>(
    []
  );

  const handleGetEventData = useCallback(async () => {
    if (account) {
      try {
        const eventInfo = await getCurrentEventInfo(
          account,
          library?.provider,
          chainId
        );
        if (eventInfo) setCurrentEventInfo(eventInfo.data.eventUserList);
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
      <h3 className="mb-30 text-center">Recent Buyers </h3>
      {!currentEventInfo.length ? (
        <div>
          <h5 style={{ textAlign: "center" }}>No Buyers yet</h5>
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
                <p>{val.randomNumber}</p>
                <span>Number</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Buyers;
