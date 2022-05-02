import { useWeb3React } from "@web3-react/core";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getUserAllowance } from "../../Utils/lottery/methods";
import { getUserTokenBalance } from "../../Utils/lottery/userMethods";

interface IUser {
  tokenBalance: number;
  allowance: number;
  isAllowanceApproved: boolean;
}

interface ILotteryUserContext extends IUser {
  refetch: () => Promise<void>;
}

export const LotteryUserContext = createContext<ILotteryUserContext>({
  tokenBalance: 0,
  allowance: 0,
  isAllowanceApproved: false,
  refetch: async () => {},
});

const LotteryUserContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { account, library, chainId } = useWeb3React();
  const [userData, setUserData] = useState<IUser>({
    tokenBalance: 0,
    allowance: 0,
    isAllowanceApproved: false,
  });

  const handleGetUserData = useCallback(async () => {
    if (account) {
      try {
        const userAllowance = await getUserAllowance(
          account,
          library?.provider,
          chainId
        );
        const tokenBalance = await getUserTokenBalance(
          account,
          library?.provider,
          chainId
        );
        setUserData({
          allowance: userAllowance,
          isAllowanceApproved: userAllowance < 100 ? false : true,
          tokenBalance,
        });
      } catch (error) {
        console.log(error);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId]);

  useEffect(() => {
    handleGetUserData();
  }, [handleGetUserData]);

  return (
    <LotteryUserContext.Provider
      value={{ ...userData, refetch: handleGetUserData }}
    >
      {children}
    </LotteryUserContext.Provider>
  );
};

export default LotteryUserContextProvider;
