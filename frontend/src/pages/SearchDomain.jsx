import { useState } from "react";
import { getContract } from "../contract";

export default function SearchDomain() {
  const [domain, setDomain] = useState("");
  const [available, setAvailable] = useState(null);

  const checkAvailability = async () => {
    const contract = await getContract();
    const isAvailable = await contract.isAvailable(domain);
    setAvailable(isAvailable);
  };

  return (
    <div>
      <h2>Search Domain</h2>
      <input 
        value={domain} 
        onChange={(e) => setDomain(e.target.value)} 
        placeholder="Enter domain…" 
      />
      <button onClick={checkAvailability}>Check</button>

      {available !== null && (
        <p>{available ? "Available ✔" : "Not Available ❌"}</p>
      )}
    </div>
  );
}
