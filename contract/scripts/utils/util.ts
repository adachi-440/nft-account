import { BigNumber, ethers } from "ethers";
import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

export interface DefaultData {
  signer: ethers.Wallet,
  contract: ethers.Contract
}

const privateKey = process.env.PRIVATE_KEY !== undefined ? process.env.PRIVATE_KEY : "";

export const getDefaultData = (contractAddress: string, abi: any, url: string): DefaultData => {
  const provider = new ethers.providers.JsonRpcProvider(url);
  const walletWithProvider = new ethers.Wallet(privateKey, provider);
  const signer = walletWithProvider.connect(provider);
  const contract = new ethers.Contract(contractAddress, abi, signer);

  return { signer, contract }
}

export const sendTransaction = async (tx: any, text: string) => {
  console.log(`executing ${text}...`)
  await tx.wait()
  console.log(`complete!`)

  return tx
}
