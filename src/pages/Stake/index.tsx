import React from "react";
import StakingUserContextProvider from "../../store/context/StakingUserContext";
import Farm from "./farm";

const Farms: React.FC = () => {
  return (
    <StakingUserContextProvider>
      <Farm />
    </StakingUserContextProvider>
  );
};

export default Farms;
