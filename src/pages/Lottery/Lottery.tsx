import React, { useCallback, useContext, useEffect, useState } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";

import {
  buyTicket,
  getCurrentEventInfo,
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

const Lottery: React.FC = () => {
  const [modal, setModal] = useState(false);
  const { account, library } = useWeb3React();
  const { setTransaction } = useContext(TransactionContext);

  const [currentEventInfo, setCurrentEventInfo] =
    useState<ICurrentEvent | null>(null);
  const { isAllowanceApproved, tokenBalance, refetch } =
    useContext(LotteryUserContext);
  const [tab, setTab] = useState(1);

  const handleGetEventData = useCallback(async () => {
    if (account) {
      try {
        const eventInfo = await getCurrentEventInfo(account, library?.provider);
        if (eventInfo) setCurrentEventInfo(eventInfo.data);
      } catch (error) {
        console.log(error);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  useEffect(() => {
    handleGetEventData();
  }, [handleGetEventData]);

  const handleBuyTicket = async (lotteryNumber: number) => {
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
      lotteryNumber
    );

    if (error) {
      return setTransaction({ loading: true, status: "error" });
    }

    if (data) setCurrentEventInfo(data.data);
    setModal(false);
    setTab(1);
    setTransaction({ loading: true, status: "success" });
  };

  const handleApprove = async () => {
    if (!account) return;
    try {
      setTransaction({ loading: true, status: "pending" });
      await IncreaseUserAllowance(account, library?.provider);
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
          <img src={token} alt="token" width={40} />
          <Title />
        </div>
        <div className={"content"}>
          <h3>Hodl4Gold Lottery Live Stream</h3>
          {currentEventInfo && (
            <Countdown
              date={currentEventInfo.endTime}
              renderer={renderCountdown}
            />
          )}
          {!isAllowanceApproved ? (
            <Button onClick={() => handleApprove()}>Approve</Button>
          ) : (
            <Button onClick={() => setModal(true)}>Purchase a Ticket</Button>
          )}
        </div>
      </div>
      <LotteryModal
        modal={modal}
        tab={tab}
        setTab={setTab}
        handleClose={() => setModal(false)}
        handleBuyTicket={handleBuyTicket}
        numbersList={
          currentEventInfo?.eventUserList
            ? currentEventInfo.eventUserList.map((e) => e.randomNumber)
            : []
        }
      />
    </>
  );
};

export default Lottery;
