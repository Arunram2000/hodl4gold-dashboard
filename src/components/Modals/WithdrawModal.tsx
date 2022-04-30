import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Backdrop from "./Backdrop";
import "./Modal.scss";
import Button from "../Button";
import { modalVaraints } from "../../constants/variants";

interface IWithdrawModal {
  modal: boolean;
  handleClose?: () => void;
  handleWithdraw: () => Promise<void>;
  withdrawAmount: number;
  withdrawFee: number;
}

const WithdrawModal: React.FC<IWithdrawModal> = ({
  modal,
  handleClose,
  handleWithdraw,
  withdrawAmount,
  withdrawFee,
}) => {
  return (
    <Backdrop handleClose={handleClose} isOpen={modal}>
      <AnimatePresence exitBeforeEnter>
        {modal && (
          <motion.div
            className={"withdraw_modal"}
            onClick={(e) => e.stopPropagation()}
            variants={modalVaraints}
            animate="animate"
            initial="initial"
            exit="exit"
          >
            <div className="withdraw_modal-content">
              <h1>Withdraw</h1>
              <div data-position="flex-between">
                <p>withdraw amount</p>
                <b>
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 6,
                  }).format(withdrawAmount + withdrawFee)}
                  &nbsp;H4G
                </b>
              </div>
              <div data-position="flex-between">
                <p>withdraw Fee</p>
                <b>0.5%</b>
              </div>
              <div data-position="flex-between">
                <p>Total token you earn</p>
                <b>
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 6,
                  }).format(withdrawAmount)}
                  &nbsp;H4G
                </b>
              </div>
              <Button onClick={() => handleWithdraw()}>Withdraw</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Backdrop>
  );
};

export default WithdrawModal;
