import lighthouse from "@lighthouse-web3/sdk";

export async function uploadToIPFS(files) {
  try {
    const apiKey = import.meta.env.VITE_LIGHTHOUSE_API_KEY;

    if (!apiKey) {
      throw new Error("Lighthouse API Key missing from .env");
    }

    // Convert FileList → Array of File objects
    const filesArray = Array.from(files);

    if (filesArray.length === 0) {
      throw new Error("No files selected");
    }

    console.log("Uploading to Lighthouse...", filesArray);

    // Upload to Lighthouse
    const response = await lighthouse.upload(filesArray, apiKey);

    console.log("Lighthouse Upload Response:", response);

    return response.data.Hash; // CID of uploaded content
  } catch (err) {
    console.error("Upload error:", err);
    throw err;
  }
}
