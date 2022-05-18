import { useWeb3React } from "@web3-react/core";
import React, { useCallback, useEffect, useState } from "react";
import { FingerPrint } from "../../components/Icons";
import { getRecentWinners, IEventUserList } from "../../Utils/lottery/methods";
import { getSlicedValue } from "../../Utils/lottery/helpers";

const Leaderboard: React.FC = () => {
  const { account, library, chainId } = useWeb3React();
  const [loading, setLoading] = useState(false);

  const [currentEventInfo, setCurrentEventInfo] = useState<{
    winningNumber: number;
    winnersList: IEventUserList[];
  }>({
    winningNumber: 0,
    winnersList: [],
  });

  const handleGetEventData = useCallback(async () => {
    if (account) {
      setLoading(true);
      try {
        setCurrentEventInfo(
          await getRecentWinners(account, library?.provider, chainId)
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId]);

  useEffect(() => {
    handleGetEventData();
  }, [handleGetEventData]);

  if (loading) {
    return (
      <section className={"leaderboard"}>
        <h3 className="mb-30 text-center">Recent Lottery Winners </h3>
        <div>
          <p style={{ textAlign: "center" }}>Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className={"leaderboard"}>
      <h3 className="mb-15 text-center">Recent Lottery Winners </h3>
      {!!currentEventInfo.winnersList.length && (
        <h2 className="mb-30 text-center">
          Winning Number - {currentEventInfo.winningNumber}
        </h2>
      )}
      {!currentEventInfo.winnersList.length ? (
        <div>
          <h5 style={{ textAlign: "center" }}>No History Found</h5>
        </div>
      ) : (
        <div className={"leaderboardWrapper"}>
          <table>
            <tbody>
              {currentEventInfo.winnersList.slice(0, 20).map((val, i) => (
                <tr key={i.toString()} className={"leaderboardWrapper_card"}>
                  <td>
                    <div className={"leaderboardWrapper_card_details"}>
                      <FingerPrint />
                      <div>
                        <p>
                          [{i + 1}] - {getSlicedValue(val.user)}
                        </p>
                        <span> Wallet address</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <p>{val.randomNumber}</p>
                    <span>Winning number</span>
                  </td>
                  <td>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default Leaderboard;
