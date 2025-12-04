import { ethers } from "ethers";
import DDNSABI from "./abi/DDNS.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_DDNS_CONTRACT_ADDRESS;

export const getContract = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return null;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, DDNSABI.abi, signer);
};
