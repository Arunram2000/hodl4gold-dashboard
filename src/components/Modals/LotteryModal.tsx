import React, { useEffect, useState } from "react";

import {
  Close,
  // Illustration1,
  // Illustration2,
  Refresh,
} from "../../components/Icons";
import Button from "../Button";
import { ReactComponent as Minus } from "../../assets/icons/minus.svg";
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
  handleBuyTicket: (lotterNumberList: number[]) => Promise<void>;
  numbersList: string[];
}

const LotteryModal: React.FC<LotteryModal> = ({
  modal,
  handleClose,
  handleBuyTicket,
  numbersList,
}) => {
  // const [lotteryNumber, setLotteryNumber] = useState("");
  const [lotteryList, setLotteryList] = useState<string[]>([]);
  // const [error, setError] = useState<string>();

  useEffect(() => {
    setLotteryList([String(generateRandomNumber(numbersList))]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useMemo(() => {
  //   if (lotteryNumber.length > 6) return setError("maximun 6 digit is allowed");
  //   if (lotteryNumber.length > 0) {
  //     if (lotteryNumber.startsWith("0"))
  //       return setError("number must not starts with 0");
  //     if (numbersList.includes(lotteryNumber))
  //       return setError(
  //         "This number is already taken .choose a different a one"
  //       );
  //     if (lotteryNumber.length < 6) return setError("number should be 6 digit");
  //   }
  //   return setError(undefined);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [lotteryNumber]);

  const handleRefresh = (index: number) => {
    const list = [...lotteryList];
    list[index] = String(
      generateRandomNumber([...numbersList, ...lotteryList])
    );
    setLotteryList([...list]);
  };

  const handleRemove = (index: number) => {
    const list = [...lotteryList];
    list.splice(index, 1);
    setLotteryList([...list]);
  };

  const renderTab = (
    <div
      className={
        lotteryList.length > 1 ? "lottery_content active" : "lottery_content"
      }
    >
      {lotteryList.map((list, index) => (
        <div key={index.toString()}>
          <input
            type="number"
            name={`lottery${index}`}
            value={list}
            onChange={({ target }) => {}}
          />
          {index !== 0 && (
            <div className="remove_icon" onClick={() => handleRemove(index)}>
              <Minus />
            </div>
          )}
          <div className="icon" onClick={() => handleRefresh(index)}>
            <Refresh />
          </div>
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() =>
                handleBuyTicket([...lotteryList.map((l) => Number(l))])
              }
            >
              Purchase a Ticket
            </Button>
          </div>
        </motion.div>
      </Backdrop>
    </AnimatePresence>
  );
};

export default LotteryModal;
