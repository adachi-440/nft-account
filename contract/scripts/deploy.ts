import { ethers } from "hardhat";

async function main() {
  const Item = await ethers.getContractFactory("Item");
  const item = await Item.deploy("0xd14838a68e8afbade5efb411d5871ea0011afd28");

  await item.deployed();

  console.log(`Depolyed to: ${item.address}`)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
