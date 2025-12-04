import React, { useState } from "react";
import { uploadToIPFS } from "../uploadToIPFS";

function UploadPage() {
  const [cid, setCid] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = async () => {
    if (!selectedFile) return alert("Please select a file!");

    const cid = await uploadToIPFS(selectedFile);
    setCid(cid);
  };

  return (
    <div>
      <h2>Upload Website / File to IPFS</h2>

      <input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files[0])}
      />

      <button onClick={handleFileUpload}>Upload to IPFS</button>

      {cid && (
        <p>
          <strong>CID:</strong> {cid} <br />
          <a 
            href={`https://ipfs.io/ipfs/${cid}`} 
            target="_blank"
            rel="noopener noreferrer"
          >
            View on IPFS
          </a>
        </p>
      )}
    </div>
  );
}

export default UploadPage;
