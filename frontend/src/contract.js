import { ethers } from "ethers";
import DDNS_ABI from "./abi/DDNS.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_DDNS_CONTRACT_ADDRESS;

export function getProvider() {
  if (!window.ethereum) return null;
  return new ethers.providers.Web3Provider(window.ethereum);
}

export async function connectWallet() {
  if (!window.ethereum) throw new Error("MetaMask not found");
  await window.ethereum.request({ method: "eth_requestAccounts" });
  return getProvider();
}

export function getDDNSContract() {
  if (!window.ethereum) {
    alert("MetaMask not detected!");
    return null;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer = provider.getSigner();

  return new ethers.Contract(CONTRACT_ADDRESS, DDNS_ABI.abi, signer);
}

// convenience to get a signer contract (for transactions)
export async function getSignerContract() {
  const prov = getProvider();
  if (!prov) throw new Error("No provider");
  const signer = prov.getSigner();
  return getDDNSContract(signer);
}
