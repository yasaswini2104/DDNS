# **Decentralized DNS (DDNS) – Backend**

A blockchain-based Decentralized Domain Name System (DDNS) implemented using **Hardhat**, **Solidity**, and **Ethers.js**.
This backend manages domain registration, ownership, and IPFS CID mapping in a secure and transparent way.


---

# **Project Overview**

The DDNS smart contract enables:

* **Domain registration** (first come, first serve) - Users can register unique human-readable domains.
* **Owner Verification** - Only domain owners can modify or transfer their domain.
* **IPFS Integration (CID Storage)** — Each domain maps to an IPFS content hash.
* **CID updates** (IPFS-based website or content hash)- Owners can update the CID as their website/content changes.
* **Domain ownership transfers** - Domains can be transferred securely on-chain.
* **Domain resolution** (domain → IPFS CID lookup quilckly and trustlessly)
* Ensures full decentralization with no central authority

This backend forms the core logic of the entire decentralized website hosting system.

---

# **Technology Stack**

| Component          | Purpose                                              |
| ------------------ | ---------------------------------------------------- |
| **Solidity 0.8.x** | Smart contract development language                              |
| **Hardhat 2.x**    | Ethereum Development environment                              |
| **Ethers.js v5**   | Blockchain contract interaction                               |
| **Waffle**         | Smart contract testing utilities                                    |
| **Hardhat Network Helpers** | Local blockchain testing |
| **IPFS (via CID)** | Decentralized content storage (frontend integration) |

---

# **Hardhat Setup**

The backend uses **Hardhat v2.22.6** to avoid conflicts with plugin versions.

### `package.json` (devDependencies)

```json
"devDependencies": {
  "hardhat": "2.22.6",
  "@nomiclabs/hardhat-ethers": "^2.2.3",
  "@nomiclabs/hardhat-waffle": "^2.0.3",
  "@nomicfoundation/hardhat-network-helpers": "^1.0.8",
  "ethers": "^5.7.2"
}
```

### Hardhat Config (`hardhat.config.js`)

```js
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-network-helpers");

module.exports = {
  solidity: "0.8.20",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  }
};
```

---

# **Smart Contract: DDNS.sol**

The contract supports:

* Domain registration
* Updating IPFS CID
* Ownership validation
* Domain resolution
* Ownership transfer


### ✔ Key Events

```solidity
event DomainRegistered(string domain, address owner, string cid);
event CIDUpdated(string domain, string newCid);
event OwnershipTransferred(string domain, address oldOwner, address newOwner);
```

### ✔ Core Mapping

```solidity
mapping(string => Domain) private domains;
```

### ✔ Core Functions

* `registerDomain(domain, cid)`
* `updateCID(domain, newCid)`
* `transferDomain(domain, newOwner)`
* `resolve(domain)`

---

# **How to Run the Backend**

## **1️. Install Dependencies**
Make sure you are inside the backend folder:
```bash
npm install
```

*(This installs only Hardhat v2 and compatible plugins)*

---

## **2️. Running the Local Blockchain**
Start the local Hardhat node:
```bash
npx hardhat node
```

This opens a local Ethereum network with funded accounts with ETH.

---

## **3️. Deploy the Smart Contract**

Open a second terminal(inside backend folder):

```bash
npx hardhat run scripts/deployDDNS.js --network localhost
```

Expected output:

```
DDNS deployed to: 0x5F...aa3 (<local-address> is shown)
```
(Local address is environment-specific and intentionally abbreviated.)

---

# **How DDNS Works (Architecture)**

### 1️. **Domain Registration**

User chooses a domain → 
smart contract checks availability → 
records stores:

* owner address
* IPFS CID
* existence flag

### 2️. **IPFS Content Storage**

Actual website/data is stored in **IPFS** (frontend will handle upload).
Only the CID is stored in the contract.

### 3️. **Domain Resolution**

Frontend queries:

```
resolve("example.ddns")
```

Contract returns CID → browser fetches content via IPFS gateway.

### 4️. **Decentralization**

No central DNS servers.
No organization controls domain ownership.
Everything is transparent and trustless on the blockchain.