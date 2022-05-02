import React, { useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "..";
import { ReactComponent as CopyIcon } from "../../assets/icons/copy.svg";
import { ReactComponent as CheckIcon } from "../../assets/icons/check.svg";
import { ReactComponent as Disconnect } from "../../assets/icons/logout.svg";
import { DenUserContext } from "../../store/context/DenUserContext";
import Backdrop from "./Backdrop";
import { modalVaraints } from "../../constants/variants";

interface IDenAccount {
  handleClose: () => void;
  modal: boolean;
}

const DenAccount: React.FC<IDenAccount> = ({ handleClose, modal }) => {
  const { account, deactivate } = useWeb3React();
  const [copied, setCopied] = useState(false);
  const { userData } = useContext(DenUserContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [copied]);

  const renderAddress = (
    <>
      {account && (
        <div className="copy_clipboard">
          <p>{`${account.slice(0, 8)}...${account.slice(
            account.length - 12
          )}`}</p>
          {!copied ? (
            <CopyToClipboard text={account}>
              <span onClick={() => setCopied(true)}>
                <CopyIcon />
              </span>
            </CopyToClipboard>
          ) : (
            <CheckIcon />
          )}
        </div>
      )}
    </>
  );
  return (
    <Backdrop isOpen={modal} handleClose={handleClose}>
      <AnimatePresence exitBeforeEnter>
        {modal && (
          <motion.div
            className="lotteryModal"
            onClick={(e) => e.stopPropagation()}
            variants={modalVaraints}
            animate="animate"
            initial="initial"
            exit="exit"
          >
            <div className="accounts">
              <h3 className="mb-20">{`@${userData?.username}`}</h3>
              <div data-position="flex-between" className="mb-10">
                <p>Discord username</p>
                <h4>{userData?.discord_username}</h4>
              </div>
              <div data-position="flex-between" className="mb-10">
                <p>Telegram username</p>
                <h4>{userData?.telegram_username}</h4>
              </div>
              <div data-position="flex-between" className="mb-10">
                <p>Instagram username</p>
                <h4>{userData?.instagram_username}</h4>
              </div>
              <section className="mb-20">{renderAddress}</section>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="secondary"
                  style={{ gap: "1rem" }}
                  onClick={async () => {
                    deactivate();
                    handleClose();
                  }}
                >
                  <Disconnect />
                  <span>Disconnect </span>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Backdrop>
  );
};

export default DenAccount;
