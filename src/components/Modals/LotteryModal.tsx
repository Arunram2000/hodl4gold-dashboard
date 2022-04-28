import React, { ChangeEvent, useEffect, useMemo, useState } from "react";

import {
  Close,
  Illustration1,
  Illustration2,
  Refresh,
} from "../../components/Icons";
import Button from "../Button";
import { generateRandomNumber } from "../../Utils/lottery/helpers";
import { AnimatePresence, motion } from "framer-motion";
import Backdrop from "./Backdrop";

const modalVaraints = {
  initial: {
    opacity: 0,
    scale: 0.5,
    x: "-50%",
    y: "-50%",
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.3 },
    scale: 1,
    x: "-50%",
    y: "-50%",
  },
  exit: {
    opacity: 0,
    scale: 0,
    x: "-50%",
    y: "-50%",
  },
};

interface LotteryModal {
  modal: boolean;
  handleClose?: () => void;
  handleBuyTicket: (lotterNumber: number) => Promise<void>;
  numbersList: string[];
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;
}

const LotteryModal: React.FC<LotteryModal> = ({
  modal,
  handleClose,
  handleBuyTicket,
  numbersList,
  tab,
  setTab,
}) => {
  const [lotteryNumber, setLotteryNumber] = useState("");
  const [randomNumber, setRandomNumber] = useState("");
  const [error, setError] = useState<string>();

  useEffect(() => {
    setTab(1);

    return () => {
      console.log("ended");
    };
  }, [setTab]);

  useMemo(() => {
    if (lotteryNumber.length > 6) return setError("maximun 6 digit is allowed");
    if (lotteryNumber.length > 0) {
      if (lotteryNumber.startsWith("0"))
        return setError("number must not starts with 0");
      if (numbersList.includes(lotteryNumber))
        return setError(
          "This number is already taken .choose a different a one"
        );
      if (lotteryNumber.length < 6) return setError("number should be 6 digit");
    }
    return setError(undefined);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lotteryNumber]);

  useMemo(() => {
    setLotteryNumber("");
    setRandomNumber(generateRandomNumber(numbersList));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 6) setLotteryNumber(value);
  };

  const getRandomNumber = () => {
    setRandomNumber(generateRandomNumber(numbersList));
  };

  const renderTab1 = (
    <div className={"lottery_type"}>
      <div onClick={() => setTab(2)}>
        <Illustration1 />
        <p>Generate Random Number</p>
      </div>
      <div onClick={() => setTab(3)}>
        <Illustration2 />
        <p>Create Random Numer</p>
      </div>
    </div>
  );

  const renderTab2 = (
    <div className={"lottery_section"}>
      <div className={"illustration"}>
        <Illustration1 />
      </div>
      <div className={"lottery_input"}>
        <p>{randomNumber ? randomNumber : "000000"}</p>
        <div onClick={() => getRandomNumber()}>
          <Refresh />
        </div>
      </div>
      <Button
        disabled={!randomNumber}
        onClick={() => handleBuyTicket(Number(randomNumber))}
      >
        Buy Ticket
      </Button>
    </div>
  );

  const renderTab3 = (
    <div className={"lottery_section"}>
      <div className={"illustration"}>
        <Illustration2 />
      </div>
      <div className={"lottery_input"}>
        <input
          type="number"
          placeholder="123456"
          autoFocus
          maxLength={6}
          value={lotteryNumber}
          onChange={handleChange}
        />
      </div>
      {error && <p className={error}>{error}</p>}
      <Button
        disabled={!lotteryNumber || !!error}
        onClick={() => handleBuyTicket(Number(lotteryNumber))}
      >
        Buy Ticket
      </Button>
    </div>
  );

  return (
    <AnimatePresence exitBeforeEnter>
      <Backdrop isOpen={modal} handleClose={tab === 1 && handleClose}>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          variants={modalVaraints}
          animate="animate"
          initial="initial"
          exit="exit"
          className={"lotteryModal"}
        >
          <div
            onClick={() => {
              if (tab === 1) return handleClose && handleClose();
              if (tab === 2) return setTab(1);
              if (tab === 3) return setTab(1);
            }}
            className={"lottery_header"}
          >
            <Close />
          </div>
          {
            {
              1: renderTab1,
              2: renderTab2,
              3: renderTab3,
            }[tab]
          }
        </motion.div>
      </Backdrop>
    </AnimatePresence>
  );
};

export default LotteryModal;
