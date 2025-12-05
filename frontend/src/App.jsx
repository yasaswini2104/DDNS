import { useState } from "react";
import RegisterDomain from "./pages/RegisterDomain";
import SearchDomain from "./pages/SearchDomain";
import ResolveDomain from "./pages/ResolveDomain";
import UpdateCID from "./pages/UpdateCID";
import UploadPage from "./pages/UploadPage";

function App() {
  const [account, setAccount] = useState(null);

  async function connectWallet() {
    if (!window.ethereum) {
      alert("MetaMask not installed!");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);
      console.log("Connected:", accounts[0]);
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  }

  return (
    <div className="container">
      <h1>Decentralized DNS (DDNS)</h1>

      {/* Connect Wallet Button */}
      <div style={{ marginBottom: "20px" }}>
        {account ? (
          <p><strong>Connected Wallet:</strong> {account}</p>
        ) : (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
      </div>

      <UploadPage />

      <SearchDomain />

      <RegisterDomain />

      <UpdateCID />

      <ResolveDomain />
    </div>
  );
}

export default App;
