import { useState } from "react";
import { getSignerContract } from "../contract";

export default function TransferDomain() {
  const [domain, setDomain] = useState("");
  const [newOwner, setNewOwner] = useState("");

  async function handleTransfer() {
    try {
      const contract = await getSignerContract();
      const tx = await contract.transferDomain(domain, newOwner);
      await tx.wait();

      alert(`Domain transferred successfully to ${newOwner}`);
    } catch (err) {
      console.error(err);
      alert("Transfer failed");
    }
  }

  return (
    <div>
      <h2>Transfer Domain</h2>

      <input
        type="text"
        placeholder="Domain"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Owner Address"
        value={newOwner}
        onChange={(e) => setNewOwner(e.target.value)}
      />

      <button onClick={handleTransfer}>Transfer</button>
    </div>
  );
}
