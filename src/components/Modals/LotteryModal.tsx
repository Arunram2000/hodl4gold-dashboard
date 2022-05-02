import React, { ChangeEvent, useEffect, useMemo, useState } from "react";

import {
  Close,
  // Illustration1,
  // Illustration2,
  // Refresh,
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
  const [lotteryList, setLotteryList] = useState<string[]>([]);
  const [randomNumber, setRandomNumber] = useState("");
  const [error, setError] = useState<string>();

  useEffect(() => {
    setLotteryList([String(generateRandomNumber(numbersList))]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(lotteryList);
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 6) setLotteryNumber(value);
  };

  const getRandomNumber = () => {
    setRandomNumber(generateRandomNumber(numbersList));
  };

  const renderTab = (
    <div className={"lottery_content"}>
      {lotteryList.map((list, index) => (
        <div key={index.toString()}>
          <input
            type="number"
            name={`lottery${index}`}
            value={list}
            onChange={({ target }) => {}}
          />
        </div>
      ))}
    </div>
  );

  return (
    <AnimatePresence exitBeforeEnter>
      <Backdrop isOpen={modal} handleClose={handleClose}>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          variants={modalVaraints}
          animate="animate"
          initial="initial"
          exit="exit"
          className={"lotteryModal"}
        >
          <div className={"lottery_header"}>
            <div
              className={
                lotteryList.length >= 10 ? "add_more inactive" : "add_more"
              }
              onClick={() =>
                setLotteryList([
                  ...lotteryList,
                  String(
                    generateRandomNumber([...numbersList, ...lotteryList])
                  ),
                ])
              }
            >
              <p>Add more</p>
              <Close />
            </div>
          </div>
          {renderTab}
          <div>
            <Button onClick={() => handleBuyTicket(5)}>
              Purchase a Ticket
            </Button>
          </div>
        </motion.div>
      </Backdrop>
    </AnimatePresence>
  );
};

export default LotteryModal;
