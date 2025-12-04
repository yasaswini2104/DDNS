const hre = require("hardhat");

async function main() {
  const DDNS = await hre.ethers.getContractFactory("DDNS");
  const ddns = await DDNS.deploy();

  await ddns.deployed();

  console.log("DDNS deployed to:", ddns.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
