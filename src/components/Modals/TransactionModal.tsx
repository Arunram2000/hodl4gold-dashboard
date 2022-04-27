import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Backdrop from "./Backdrop";
import "./Modal.scss";

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

interface ITransactionModal {
  modal: boolean;
  handleClose?: () => void;
  message?: string;
  status: "pending" | "success" | "error";
}

const TransactionModal: React.FC<ITransactionModal> = ({ modal, handleClose, message, status }) => {
  const getContent = () => {
    switch (status) {
      case "error":
        return "Transaction Failed";
      case "success":
        return "Transaction Completed Successfully";
      default:
        return "Loading... please wait!";
    }
  };
  return (
    <Backdrop handleClose={handleClose} isOpen={modal}>
      <AnimatePresence exitBeforeEnter>
        {modal && (
          <motion.div
            className={"transaction_modal"}
            onClick={(e) => e.stopPropagation()}
            variants={modalVaraints}
            animate="animate"
            initial="initial"
            exit="exit"
          >
            <div className="transaction_modal-content">
              <p>{message ?? getContent()}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Backdrop>
  );
};

export default TransactionModal;
