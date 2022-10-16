import { ethers } from "hardhat";

async function main() {
  const Account = await ethers.getContractFactory("Account");
  const account = await Account.deploy("https://ipfs.io/ipfs/QmQEVVLJUR1WLN15S49rzDJsSP7za9DxeqpUzWuG4aondg");

  await account.deployed();

  console.log(`Depolyed to: ${account.address}`)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
