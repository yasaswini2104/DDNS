import React, { useEffect, useState } from "react";
import { connectWallet } from "../contract";

export default function WalletBar() {
    const [account, setAccount] = useState(null);

    // Format address for UI
    const shorten = (addr) => addr.slice(0, 6) + "..." + addr.slice(-4);

    // Listen to MetaMask account changes
    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length === 0) {
                    setAccount(null);
                } else {
                    setAccount(accounts[0]);
                }
            });
        }
    }, []);

    // Connect wallet button handler
    const connect = async () => {
        try {
            const provider = await connectWallet();
            const signer = provider.getSigner();
            const addr = await signer.getAddress();
            setAccount(addr);
            if (!window.ethereum) {
                alert("MetaMask not detected");
                return;
            }
        } catch (err) {
            console.error("Wallet connect error:", err);
        }
        await window.ethereum.request({ method: "eth_requestAccounts" });
    };

    // Disconnect wallet (frontend only)
    const disconnect = () => {
        setAccount(null);
    };

    return (
        <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between",
            padding: "12px 20px",
            background: "#111",
            color: "white",
            borderRadius: "10px",
            marginBottom: "20px"
        }}>
            
            <h2>DDNS Wallet</h2>

            {account ? (
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    <span style={{ fontSize: "1.1rem" }}>
                        Connected: <b>{shorten(account)}</b>
                    </span>
                    <button 
                        onClick={disconnect}
                        style={{
                            padding: "8px 12px",
                            background: "#d9534f",
                            borderRadius: "6px",
                            cursor: "pointer",
                            border: "none",
                            color: "white"
                        }}
                    >
                        Disconnect
                    </button>
                </div>
            ) : (
                <button 
                    onClick={connect}
                    style={{
                        padding: "10px 14px",
                        background: "#5cb85c",
                        borderRadius: "6px",
                        cursor: "pointer",
                        border: "none",
                        color: "white"
                    }}
                >
                    Connect Wallet
                </button>
            )}
        </div>
    );
}
