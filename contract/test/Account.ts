import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { ethers } from "hardhat"
import { Account__factory, Account, Item } from "../typechain-types"
import { ItemFixture } from "./Item"

interface AccountFixture {
  Account: Account__factory
  account: Account
  accountOwner: SignerWithAddress
  accountOwnerAddress: string
}

interface OwnData {
  srcContract: string
  tokenIds: number[]
}

describe("Account Contract", async function () {
  let id = 1
  async function deployAccountFixture(): Promise<AccountFixture> {
    const Account = await ethers.getContractFactory("Account");
    const [accountOwner, addr1, addr2] = await ethers.getSigners();
    const accountOwnerAddress = await accountOwner.getAddress()

    const account = await Account.deploy("https://ipfs.io/ipfs/QmQEVVLJUR1WLN15S49rzDJsSP7za9DxeqpUzWuG4aondg");

    await account.deployed();
    return { Account, account, accountOwner, accountOwnerAddress };
  }

  async function deployItemFixture(): Promise<ItemFixture> {
    const Item = await ethers.getContractFactory("Item");
    const [owner, addr1, addr2] = await ethers.getSigners();
    const ownerAddress = await owner.getAddress()

    const item = await Item.deploy("0x29Ff193EfFF326a7182bc4d235231553B6785B61");

    await item.deployed();
    return { Item, item, owner, ownerAddress };
  }

  async function mintNFT(item: Item, owner: SignerWithAddress, attackPoint: number, hp: number): Promise<number> {
    const tx = await item.connect(owner).mint(attackPoint, hp)
    await tx.wait()
    const tokenId = id
    id++
    return tokenId
  }

  it("Should be minted", async function () {
    const { Account, account, accountOwner, accountOwnerAddress }: AccountFixture = await loadFixture(deployAccountFixture);
    const { Item, item, owner, ownerAddress }: ItemFixture = await loadFixture(deployItemFixture);
    const tokenId = await mintNFT(item, accountOwner, 500, 2000)
    const tokenId2 = await mintNFT(item, accountOwner, 500, 2000)
    const itemContract = item.address

    const data: OwnData = {
      srcContract: itemContract,
      tokenIds: [tokenId, tokenId2]
    }

    const t = await item.setApprovalForAll(account.address, true)
    await t.wait()

    const tx = await account.mint(data)
    const resTx = await tx.wait()
    const events = resTx.events
    if (events !== undefined) {
      console.log(events)
    }
  })
})