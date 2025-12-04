import { NFTStorage, File } from "nft.storage";

const client = new NFTStorage({
  token: import.meta.env.VITE_NFT_STORAGE_KEY
});

export async function uploadToIPFS(file) {
  try {
    const cid = await client.storeBlob(file);
    console.log("Uploaded to IPFS:", cid);
    return cid;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw error;
  }
}
