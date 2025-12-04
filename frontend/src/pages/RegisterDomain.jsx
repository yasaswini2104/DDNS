import { useState } from "react";
import { getContract } from "../contract";

export default function RegisterDomain() {
  const [domain, setDomain] = useState("");
  const [cid, setCid] = useState("");
  const [message, setMessage] = useState("");

  const register = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.registerDomain(domain, cid);
      await tx.wait();
      setMessage("Domain Registered Successfully!");
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2>Register Domain</h2>
      <input 
        placeholder="Domain" 
        value={domain} 
        onChange={(e) => setDomain(e.target.value)} 
      />
      
      <input 
        placeholder="IPFS CID" 
        value={cid} 
        onChange={(e) => setCid(e.target.value)} 
      />

      <button onClick={register}>Register</button>

      <p>{message}</p>
    </div>
  );
}
