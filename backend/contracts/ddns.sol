// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DDNS {
    struct Domain {
        address owner;
        string cid;
        bool exists;
    }

    mapping(string => Domain) private domains;

    event DomainRegistered(string domain, address owner, string cid);
    event CIDUpdated(string domain, string newCid);
    event OwnershipTransferred(string domain, address oldOwner, address newOwner);

    modifier onlyOwner(string memory domain) {
        require(domains[domain].owner == msg.sender, "Not owner");
        _;
    }

    function isAvailable(string memory domain) public view returns (bool) {
        return !domains[domain].exists;
    }

    function registerDomain(string memory domain, string memory cid) public {
        require(!domains[domain].exists, "Already registered");

        domains[domain] = Domain({
            owner: msg.sender,
            cid: cid,
            exists: true
        });

        emit DomainRegistered(domain, msg.sender, cid);
    }

    function updateCID(string memory domain, string memory newCid)
        public
        onlyOwner(domain)
    {
        domains[domain].cid = newCid;
        emit CIDUpdated(domain, newCid);
    }

    function transferDomain(string memory domain, address newOwner)
        public
        onlyOwner(domain)
    {
        address old = domains[domain].owner;
        domains[domain].owner = newOwner;

        emit OwnershipTransferred(domain, old, newOwner);
    }

    function resolve(string memory domain) public view returns (string memory) {
        require(domains[domain].exists, "Domain not found");
        return domains[domain].cid;
    }
}
