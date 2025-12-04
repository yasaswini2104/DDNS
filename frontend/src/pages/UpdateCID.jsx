import { useState } from "react";
import { getContract } from "../contract";

export default function UpdateCID() {
  const [domain, setDomain] = useState("");
  const [cid, setCid] = useState("");

  const update = async () => {
    const contract = await getContract();
    const tx = await contract.updateCID(domain, cid);
    await tx.wait();
    alert("CID Updated!");
  };

  return (
    <div>
      <h2>Update CID</h2>
      <input 
        placeholder="Domain" 
        value={domain} 
        onChange={(e) => setDomain(e.target.value)} 
      />

      <input 
        placeholder="New IPFS CID" 
        value={cid} 
        onChange={(e) => setCid(e.target.value)} 
      />

      <button onClick={update}>Update</button>
    </div>
  );
}
