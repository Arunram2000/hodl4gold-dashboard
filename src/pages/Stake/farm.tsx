import React, { useCallback, useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import { Button} from "../../components";
import UnlockWallet from "../../components/UnlockWallet";
import { UserContext } from "../../store/context/UserContex";

import token from "../../assets/logo/token.png";
import { TransactionContext } from "../../store/context/TransactionContext";
import {
  claimBUSD,
  getContractDetails,
  setApprove,
  setCompound,
  setHarvest,
  setStake,
  withdraw,
} from "../../Utils/stake/contractMethods";
import { IContractData } from "../../store/types";
import WithdrawModal from "../../components/Modals/WithdrawModal";
import './Home.scss'

const Farm: React.FC = () => {
  const { account, library } = useWeb3React();
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [deposit, setDeposit] = useState("");
  const [contractData, setContractData] = useState<IContractData>({
    apy: 0,
    endTime: undefined,
  });
  const { userData, setUserData, refetch } = useContext(UserContext);
  const { setTransaction, loading } = useContext(TransactionContext);

  const handleGetApy = useCallback(async () => {
    if (account) {
      try {
        setContractData(await getContractDetails(library?.provider, account));
      } catch (error) {
        console.log(error);
      }
    }
  }, [account, library]);

  useEffect(() => {
    handleGetApy();
  }, [handleGetApy]);

  const handleApprove = async () => {
    if (!account) return;
    setTransaction({ loading: true, status: "pending" });
    const { data, error } = await setApprove(library?.provider, account);

    if (error) {
      setTransaction({
        loading: true,
        status: "error",
        message: error.message,
      });
      return;
    }

    setUserData({
      ...userData,
      userAllowance: data,
      isAllowanceApproved: true,
    });
    setTransaction({ loading: true, status: "success" });
  };

  const handleDeposit = async () => {
    if (!account) return;
    try {
      if (userData.tokenBalance < Number(deposit)) {
        setTransaction({
          loading: true,
          status: "error",
          message: "Insufficient funds to deposit",
        });
        return;
      }
      setTransaction({ loading: true, status: "pending" });
      await setStake(library?.provider, account, deposit);
      setDeposit("");
      await refetch();
      setTransaction({ loading: true, status: "success" });
    } catch (error: any) {
      console.log(error);
      setTransaction({
        loading: true,
        status: "error",
        message: error.message,
      });
    }
  };

  const handleCompound = async () => {
    if (!account) return;
    try {
      setTransaction({ loading: true, status: "pending" });
      await setCompound(library?.provider, account, userData.totalStaked);
      await refetch();
      setTransaction({ loading: true, status: "success" });
    } catch (error: any) {
      console.log(error);
      setTransaction({
        loading: true,
        status: "error",
        message: error.message,
      });
    }
  };

  const handleHarvest = async () => {
    if (!account) return;
    try {
      setTransaction({ loading: true, status: "pending" });
      await setHarvest(library?.provider, account, userData.totalStaked);
      await refetch();
      setTransaction({ loading: true, status: "success" });
    } catch (error: any) {
      console.log(error);
      setTransaction({
        loading: true,
        status: "error",
        message: error.message,
      });
    }
  };

  const handleClaim = async () => {
    if (!account) return;
    try {
      setTransaction({ loading: true, status: "pending" });
      await claimBUSD(library?.provider, account);
      await refetch();
      setTransaction({ loading: true, status: "success" });
    } catch (error: any) {
      console.log(error);
      setTransaction({
        loading: true,
        status: "error",
        message: error.message,
      });
    }
  };

  const handleWithdraw = async () => {
    if (!account) return;
    try {
      setTransaction({ loading: true, status: "pending" });
      await withdraw(library?.provider, account);
      await refetch();
      setTransaction({ loading: true, status: "success" });
    } catch (error: any) {
      console.log(error);
      setTransaction({
        loading: true,
        status: "error",
        message: error.message,
      });
    } finally {
      setWithdrawModal(false);
    }
  };

  const renderMethods = (
    <div>
      <div
        className="mb-20"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="mb-10" data-position="flex-between">
          <h5>Total Staked</h5>
          <b style={{ fontSize: "1.7rem" }}>
            {new Intl.NumberFormat("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 4,
            }).format(userData.totalStaked)}{" "}
            H4G
          </b>
        </div>
        <Button
          disabled={loading || !userData.totalStaked}
          onClick={() => setWithdrawModal(true)}
        >
          Withdraw
        </Button>
      </div>
      <div className="rewards">
        <h5>Earned rewards</h5>
        <div data-position="flex-between">
          <h3>
            {new Intl.NumberFormat("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 8,
            }).format(userData.rewards)}{" "}
            H4G
          </h3>
          <section>
            <Button
              variant="secondary"
              disabled={loading || !userData.rewards}
              onClick={() => handleCompound()}
            >
              Compound
            </Button>
            <Button
              variant="secondary"
              disabled={loading || !userData.rewards}
              onClick={() => handleHarvest()}
            >
              Harvest
            </Button>
          </section>
        </div>
      </div>
      <div className="rewards mb-20">
        <h5 className="mb-10">Earned BUSD rewards</h5>
        <div data-position="flex-between">
          <h3>
            {new Intl.NumberFormat("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 8,
            }).format(userData.busdReward)}{" "}
            BUSD
          </h3>
          <section>
            <Button
              variant="secondary"
              disabled={loading || !userData.busdReward}
              onClick={() => handleClaim()}
            >
              Claim
            </Button>
          </section>
        </div>
      </div>
      <div className="form_input">
        <label htmlFor="deposit">
          <strong>Deposit</strong>
        </label>
        <div className="mb-15">
          <input
            type="number"
            placeholder="0.0"
            min="0"
            value={deposit}
            onChange={({ target }) => setDeposit(target.value)}
          />
        </div>
        <Button
          disabled={loading || !deposit || Number(deposit) <= 0}
          onClick={() => handleDeposit()}
        >
          Deposit
        </Button>
      </div>
    </div>
  );

  return (

    <>
    <div className="home">
      <div className="farm">
        <div className="farm_header">
          <div data-position="flex-between">
            <h3>Earn H4G</h3>
            <img src={token} alt="token" width={60} />
          </div>
        </div>
        <div data-position="flex-between">
          <p>APY:</p>
          <b>
            {new Intl.NumberFormat("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            }).format(contractData.apy)}
            %
          </b>
        </div>
        <div>
          <div data-position="flex-between">
            <p className="primary">Deposit Fee</p>
            <b>0%</b>
          </div>
          <div data-position="flex-between">
            <p className="primary">Withdraw Fee</p>
            <b>0.5%</b>
          </div>
        </div>
        {!account ? (
          <UnlockWallet />
        ) : !userData.isAllowanceApproved ? (
          <Button disabled={loading} onClick={() => handleApprove()}>
            Approve
          </Button>
        ) : (
          renderMethods
        )}
      </div>
      <WithdrawModal
        modal={withdrawModal}
        handleWithdraw={handleWithdraw}
        handleClose={() => setWithdrawModal(false)}
        withdrawAmount={userData.withdrawAmount}
        withdrawFee={userData.withdrawFee}
      />
      </div>
    </>
  );
};

export default Farm;