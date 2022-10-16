import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from 'dotenv';

dotenv.config();
const accounts =
  process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [];

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
    },
    arbitrum_goerli: {
      url: `https://restless-dark-voice.arbitrum-goerli.discover.quiknode.pro/${process.env.ARBITRUM_GOERLI_APY_KEY}/`,
      accounts
    },
    goerli: {
      url: `https://responsive-newest-county.ethereum-goerli.discover.quiknode.pro/${process.env.ETHEREUM_GOERLI_API_KEY}/`,
      accounts
    }
  },
};

export default config;
