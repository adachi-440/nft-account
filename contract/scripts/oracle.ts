import { BigNumber, ethers, utils } from "ethers";
import { abi } from "../artifacts/contracts/Item.sol/Item.json";
import * as dotenv from 'dotenv';
import { formatEther, formatUnits, parseUnits } from "ethers/lib/utils";
import { getDefaultData, sendTransaction } from "./utils/util";

dotenv.config({ path: '../.env' });

const CONTRACT_ADDRESS = "0x9a98997826cB17cBab915E33F1E8604A11C76b9b";
const ORACLE_ADDRESS = "0x816Ebc454c3d2A1058C6bd2CCA2d092B81bC47d9"
const JOB_ID = "1a9954f42d8a4da381950548378c1e8c"
const URL = `https://restless-dark-voice.arbitrum-goerli.discover.quiknode.pro/${process.env.ARBITRUM_GOERLI_APY_KEY}/`

async function oracle(): Promise<void> {

  const { contract } = getDefaultData(CONTRACT_ADDRESS, abi, URL)
  let tx;

  // set oracle
  tx = await contract.setOracle(ORACLE_ADDRESS)
  tx = await sendTransaction(tx, "setOracle")

  // set jobId
  tx = await contract.setJobId(JOB_ID)
  tx = await sendTransaction(tx, "setJobId")

  // // mint NFT
  // tx = await contract.mint(1500, 3000)
  // tx = await sendTransaction(tx, "mint NFT")

  // request oracle
  tx = await contract.requestRandomNumber(1, { gasLimit: 400000 })
  tx = await sendTransaction(tx, "request random number")
  console.log(tx)
}


oracle().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});