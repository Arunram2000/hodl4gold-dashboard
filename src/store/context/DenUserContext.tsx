import { useWeb3React } from "@web3-react/core";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getUserApi } from "../../api/denApi";
import FormModal from "../../components/Modals/FormModal";
import { IDenUser } from "../types";

interface IDenUserContext {
  userData: IDenUser | null;
  isLoading: boolean;
  fetchUserData: () => Promise<void>;
}

export const DenUserContext = createContext<IDenUserContext>({
  isLoading: false,
  userData: null,
  fetchUserData: async () => {},
});

const DenUserContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<IDenUser | null>(null);
  const [isLoading, setLoading] = useState(false);
  const { account } = useWeb3React();

  const handleGetUserData = useCallback(async () => {
    if (account) {
      setLoading(true);
      try {
        const { data } = await getUserApi({ account: account });
        setUserData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }, [account]);

  useEffect(() => {
    handleGetUserData();
  }, [handleGetUserData]);

  return (
    <DenUserContext.Provider
      value={{
        isLoading,
        userData,
        fetchUserData: handleGetUserData,
      }}
    >
      {children}
      {!isLoading && (
        <FormModal
          modal={!userData?.username ? true : false}
          refetch={handleGetUserData}
        />
      )}
    </DenUserContext.Provider>
  );
};

export default DenUserContextProvider;
