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
import { modalVaraints } from "../../constants/variants";

interface LotteryModal {
  modal: boolean;
  handleClose?: () => void;
  handleBuyTicket: (lotterNumberList: number[]) => Promise<void>;
}

const LotteryModal: React.FC<LotteryModal> = ({
  modal,
  handleClose,
  handleBuyTicket,
}) => {
  const [lotteryList, setLotteryList] = useState<string[]>([]);
  const [error, setError] = useState<string[]>([]);

  useEffect(() => {
    setLotteryList([String(generateRandomNumber())]);
    setError([""]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = (index: number) => {
    const list = [...lotteryList];
    list[index] = String(generateRandomNumber());
    setLotteryList([...list]);
  };

  const handleRemove = (index: number) => {
    const list = [...lotteryList];
    list.splice(index, 1);
    setLotteryList([...list]);
  };

  const handleLotterInput = (value: string, index: number) => {
    if (value.length > 6) return;
    if (value.length && !/^[0-9]+$/.test(value)) return;

    if (value.length < 6) {
      error[index] = "random number must be 6 digit";
      setError([...error]);
    } else if (value.startsWith("0")) {
      error[index] = "number must not starts with 0";
      setError([...error]);
    } else {
      error[index] = "";
      setError([...error]);
    }
    lotteryList[index] = value;
    setLotteryList([...lotteryList]);
  };

  const renderTab = (
    <div
      className={
        lotteryList.length > 1 ? "lottery_content active" : "lottery_content"
      }
    >
      {lotteryList.map((list, index) => (
        <div key={index.toString()} className="lottery_input">
          <div>
            <input
              type="text"
              name={`lottery${index}`}
              value={list}
              onChange={({ target }) => handleLotterInput(target.value, index)}
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
          {error[index] && <p style={{ color: "tomato" }}>{error[index]}</p>}
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
              onClick={() => {
                setLotteryList([
                  ...lotteryList,
                  String(generateRandomNumber()),
                ]);
                setError([...error, ""]);
              }}
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
              disabled={error.some((e) => e !== "")}
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
