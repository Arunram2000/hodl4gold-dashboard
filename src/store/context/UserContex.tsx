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
  withdrawAmount: number;
  withdrawFee: number;
}

interface IUserContext {
  isLoading: boolean;
  setUserData: React.Dispatch<React.SetStateAction<IUser>>;
  userData: IUser;
  refetch: () => Promise<void>;
}

export const UserContext = createContext<IUserContext>({
  userData: {
    tokenBalance: 0,
    userAllowance: 0,
    rewards: 0,
    totalStaked: 0,
    isAllowanceApproved: false,
    busdReward: 0,
    withdrawAmount: 0,
    withdrawFee: 0,
  },
  setUserData: () => {},
  isLoading: false,
  refetch: async () => {},
});

const UserContextProvider: React.FC<{ children: ReactNode }> = ({
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
    withdrawAmount: 0,
    withdrawFee: 0,
  });

  const { account, library } = useWeb3React();

  const handleGetUserData = useCallback(async () => {
    if (account) {
      const { provider } = library;
      try {
        const userAllowance = await getUserAllowance(provider, account);
        const { totalStaked, busdReward } = await getUserDetails(
          provider,
          account
        );
        const rewards = await getRewardAmount(provider, account, totalStaked);
        const { withdrawAmount, withdrawFee } = await getUserWithdrawAmount(
          provider,
          account
        );
        setIsLoading(true);
        setUserData({
          ...userData,
          tokenBalance: await getTokenBalance(provider, account),
          userAllowance,
          isAllowanceApproved: userAllowance < 100 ? false : true,
          rewards,
          totalStaked,
          busdReward,
          withdrawAmount,
          withdrawFee,
        });
        setIsLoading(false);
      } catch (error: any) {
        console.log(error);
        setIsLoading(false);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, library]);

  useEffect(() => {
    handleGetUserData();
  }, [handleGetUserData]);

  return (
    <UserContext.Provider
      value={{ userData, setUserData, isLoading, refetch: handleGetUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
