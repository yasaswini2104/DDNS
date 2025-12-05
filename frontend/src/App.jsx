import { useState } from "react";
import RegisterDomain from "./pages/RegisterDomain";
import SearchDomain from "./pages/SearchDomain";
import ResolveDomain from "./pages/ResolveDomain";
import UpdateCID from "./pages/UpdateCID";
import UploadPage from "./pages/UploadPage";
import WalletBar from "./components/WalletBar";


function App() {

  return (
    <div className="container">
      <h1>Decentralized DNS (DDNS)</h1>

      
      <WalletBar />

      <UploadPage />

      <SearchDomain />

      <RegisterDomain />

      <UpdateCID />

      <ResolveDomain />
    </div>
  );
}

export default App;
