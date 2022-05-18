import React, { useCallback, useContext, useEffect, useState } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";

import {
  buyTicket,
  getCurrentEventInfo,
  getTicketFee,
  ICurrentEvent,
  IncreaseUserAllowance,
} from "../../Utils/lottery/methods";

import LotteryModal from "../../components/Modals/LotteryModal";
import { useWeb3React } from "@web3-react/core";
import { TransactionContext } from "../../store/context/TransactionContext";
import Title from "../../components/Icons/Title";
import token from "../../assets/logo/token.png";
import { Button } from "../../components";
import { LotteryUserContext } from "../../store/context/LotteryUserContext";
import RewardTable from "./RewardTable";
import Buyers from "./Buyers";
import LatestWin from "./LatestWin";

const Lottery: React.FC = () => {
  const [modal, setModal] = useState(false);
  const { account, library, chainId } = useWeb3React();
  const { setTransaction } = useContext(TransactionContext);

  const [currentEventInfo, setCurrentEventInfo] =
    useState<ICurrentEvent | null>(null);
  const { isAllowanceApproved, tokenBalance, refetch } =
    useContext(LotteryUserContext);
  const [ticketFee, setTicketFee] = useState(0);
  const [loading, setIsLoading] = useState(false);

  const handleGetEventData = useCallback(async () => {
    if (account) {
      try {
        setIsLoading(true);
        const eventInfo = await getCurrentEventInfo(
          account,
          library?.provider,
          chainId
        );
        const ticketfee = await getTicketFee(
          account,
          library?.provider,
          chainId
        );
        if (eventInfo) setCurrentEventInfo(eventInfo.data);
        setTicketFee(ticketfee);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId]);

  useEffect(() => {
    handleGetEventData();
  }, [handleGetEventData]);

  const handleBuyTicket = async (lotteryNumberList: number[]) => {
    if (!account) return;
    if (tokenBalance < 1)
      return setTransaction({
        loading: true,
        status: "error",
        message: "Insufficient balance to buy this ticket",
      });
    setTransaction({ loading: true, status: "pending" });
    const { data, error } = await buyTicket(
      account,
      library?.provider,
      chainId,
      lotteryNumberList
    );

    if (error) {
      return setTransaction({ loading: true, status: "error" });
    }

    if (data) setCurrentEventInfo(data.data);
    setModal(false);
    setTransaction({ loading: true, status: "success" });
  };

  const handleApprove = async () => {
    if (!account) return;
    try {
      setTransaction({ loading: true, status: "pending" });
      await IncreaseUserAllowance(account, library?.provider, chainId);
      await refetch();

      setTransaction({ loading: true, status: "success" });
    } catch (error) {
      setTransaction({ loading: true, status: "error" });
    }
  };

  const renderCountdown = ({
    completed,
    days,
    minutes,
    seconds,
    hours,
  }: CountdownRenderProps) => {
    if (completed) {
      return (
        <div className={"countdown"}>
          <div>
            <p>00</p>
            <span>Days</span>
          </div>
          <div>
            <p>00</p>
            <span>Hours</span>
          </div>
          <div>
            <p>00</p>
            <span>Minutes</span>
          </div>
          <div>
            <p>00</p>
            <span>Seconds</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className={"countdown"}>
          <div>
            <p>{days < 10 ? `0${days}` : days}</p>
            <span>Days</span>
          </div>
          <div>
            <p>{hours < 10 ? `0${hours}` : hours}</p>
            <span>Hours</span>
          </div>
          <div>
            <p>{minutes < 10 ? `0${minutes}` : minutes}</p>
            <span>Minutes</span>
          </div>
          <div>
            <p>{seconds < 10 ? `0${seconds}` : seconds}</p>
            <span>Seconds</span>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className={"lottery_wrapper"}>
        <div className={"header"}>
          <div className="header-logo">
            <img src={token} alt="token" width={40} />
            <Title />
          </div>
          <p>
            Balance :{" "}
            <strong>
              {new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 6,
              }).format(tokenBalance)}{" "}
              BUSD
            </strong>
          </p>
        </div>
        <div className={"content"}>
          <div>
            <h3>Hodl4Gold Lottery Live Stream</h3>
            <h2>
              Total Prize Pool{" "}
              {currentEventInfo?.totalBalance
                ? new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }).format(currentEventInfo.totalBalance)
                : 0}
              &nbsp;BUSD
            </h2>
            <h4>
              Ticket price&nbsp;
              {new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }).format(ticketFee)}{" "}
              BUSD
            </h4>
          </div>
          {currentEventInfo && (
            <Countdown
              date={currentEventInfo.endTime}
              renderer={renderCountdown}
            />
          )}
          {!isAllowanceApproved ? (
            <Button disabled={loading} onClick={() => handleApprove()}>
              Approve
            </Button>
          ) : (
            <Button onClick={() => setModal(true)}>Purchase a Ticket</Button>
          )}
          <RewardTable
            totalPrizePool={
              currentEventInfo ? currentEventInfo.totalBalance : undefined
            }
          />
          {currentEventInfo?.latestEvents && (
            <LatestWin latestEvents={currentEventInfo.latestEvents} />
          )}
        </div>
      </div>
      {currentEventInfo?.eventUserList && (
        <Buyers currentEventInfo={currentEventInfo.eventUserList} />
      )}
      <LotteryModal
        modal={modal}
        handleClose={() => setModal(false)}
        handleBuyTicket={handleBuyTicket}
      />
    </>
  );
};

export default Lottery;
