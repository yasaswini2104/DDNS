import { useState } from "react";
import { getContract } from "../contract";

export default function ResolveDomain() {
  const [domain, setDomain] = useState("");
  const [cid, setCid] = useState("");

  const resolve = async () => {
    const contract = await getContract();
    const result = await contract.resolve(domain);
    setCid(result);
  };

  return (
    <div>
      <h2>Resolve Domain</h2>

      <input 
        placeholder="Domain" 
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      />

      <button onClick={resolve}>Resolve</button>

      {cid && <p>IPFS CID: {cid}</p>}
    </div>
  );
}
