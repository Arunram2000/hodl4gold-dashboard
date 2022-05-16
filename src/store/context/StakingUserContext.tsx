import React, {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useWeb3React } from "@web3-react/core";
import {
  getRewardAmount,
  getTokenBalance,
  getUserAllowance,
  getUserDetails,
  getUserWithdrawAmount,
} from "../../Utils/stake/userMethods";

interface IUser {
  tokenBalance: number;
  userAllowance: number;
  rewards: number;
  totalStaked: number;
  isAllowanceApproved: boolean;
  busdReward: number;
  h4gReward: number;
  withdrawAmount: number;
  withdrawFee: number;
}

interface IStakingUserContext {
  isLoading: boolean;
  setUserData: React.Dispatch<React.SetStateAction<IUser>>;
  userData: IUser;
  refetch: () => Promise<void>;
}

export const StakingUserContext = createContext<IStakingUserContext>({
  userData: {
    tokenBalance: 0,
    userAllowance: 0,
    rewards: 0,
    totalStaked: 0,
    isAllowanceApproved: false,
    busdReward: 0,
    h4gReward: 0,
    withdrawAmount: 0,
    withdrawFee: 0,
  },
  setUserData: () => {},
  isLoading: false,
  refetch: async () => {},
});

const StakingUserContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<IUser>({
    tokenBalance: 0,
    userAllowance: 0,
    rewards: 0,
    totalStaked: 0,
    isAllowanceApproved: false,
    busdReward: 0,
    h4gReward: 0,
    withdrawAmount: 0,
    withdrawFee: 0,
  });

  const { account, library, chainId } = useWeb3React();

  const handleGetUserData = useCallback(async () => {
    if (account) {
      const { provider } = library;
      try {
        setIsLoading(true);
        const userAllowance = await getUserAllowance(
          provider,
          account,
          chainId
        );
        const { totalStaked, busdReward, h4gReward } = await getUserDetails(
          provider,
          account,
          chainId
        );
        const rewards = await getRewardAmount(
          provider,
          account,
          chainId,
          totalStaked
        );
        const { withdrawAmount, withdrawFee } = await getUserWithdrawAmount(
          provider,
          account,
          chainId
        );
        setUserData({
          ...userData,
          tokenBalance: await getTokenBalance(provider, account, chainId),
          userAllowance,
          isAllowanceApproved: userAllowance < 100 ? false : true,
          rewards,
          totalStaked,
          busdReward,
          h4gReward,
          withdrawAmount: withdrawAmount + h4gReward,
          withdrawFee,
        });
        setIsLoading(false);
      } catch (error: any) {
        console.log(error);
        setIsLoading(false);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId]);

  useEffect(() => {
    handleGetUserData();
  }, [handleGetUserData]);

  return (
    <StakingUserContext.Provider
      value={{ userData, setUserData, isLoading, refetch: handleGetUserData }}
    >
      {children}
    </StakingUserContext.Provider>
  );
};

export default StakingUserContextProvider;
