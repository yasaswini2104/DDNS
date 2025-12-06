import React, { useState } from "react";
import { uploadToIPFS } from "../uploadToIPFS";

export default function UploadPage({ onCid }) {
  const [files, setFiles] = useState(null);
  const [cid, setCid] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      alert("Please select at least one file");
      return;
    }

    setLoading(true);
    try {
      const uploadedCid = await uploadToIPFS(files);
      setCid(uploadedCid);

      if (onCid) onCid(uploadedCid);
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Upload Website / File to IPFS (Lighthouse)</h3>

      <input
        type="file"
        multiple
        onChange={(e) => setFiles(e.target.files)}
      />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload to IPFS"}
      </button>

      {cid && (
        <div>
          <p><strong>CID:</strong> {cid}</p>

          <a
            href={`https://gateway.lighthouse.storage/ipfs/${cid}`}
            target="_blank"
            rel="noreferrer"
          >
            View Uploaded File
          </a>
        </div>
      )}
    </div>
  );
}
