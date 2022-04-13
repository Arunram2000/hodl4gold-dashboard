import { ethers } from "ethers";
import { H4G_Address, RPC_URL } from "./config";
import abi from "./constants/H4G_ABI.json";

export const getDividendContract = () => {
  return new ethers.Contract(
    H4G_Address,
    abi,
    new ethers.providers.JsonRpcProvider(RPC_URL)
  );
};
