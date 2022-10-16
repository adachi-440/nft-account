import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { ethers } from "hardhat"
import { Account, Account__factory, Item, Item__factory } from "../typechain-types"
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { expect } from "chai"
import { ContractReceipt, utils } from "ethers"
import { emitWarning } from "process"


export interface ItemFixture {
  Item: Item__factory
  item: Item
  owner: SignerWithAddress
  ownerAddress: string
}


describe("Item contract", function () {
  async function deployItemFixture(): Promise<ItemFixture> {
    const Item = await ethers.getContractFactory("Item");
    const [owner, addr1, addr2] = await ethers.getSigners();
    const ownerAddress = await owner.getAddress()

    const item = await Item.deploy("0x29Ff193EfFF326a7182bc4d235231553B6785B61");

    await item.deployed();
    return { Item, item, owner, ownerAddress };
  }

  describe("Mint NFT", async function () {
    let id = 1

    it("Should be minted", async function () {
      const { Item, item, owner, ownerAddress }: ItemFixture = await loadFixture(deployItemFixture);

      const attackPoint = Math.floor(Math.random() * 1000);
      const hp = Math.floor(Math.random() * 3000);
      const tx = await item.connect(owner).mint(attackPoint, hp)
      await tx.wait()
      expect(await item.ownerOf(id)).to.equal(ownerAddress)
      expect(await item.getAttackPointOfTokenId(id)).to.equal(attackPoint)
      expect(await item.getHpOfAttackTokenId(id)).to.equal(hp)
      id++
    })
  })

  describe("Battle Judge", async function () {
    let id = 1
    async function mintNFT(item: Item, owner: SignerWithAddress, attackPoint: number, hp: number): Promise<number> {
      const tx = await item.connect(owner).mint(attackPoint, hp)
      await tx.wait()
      const tokenId = id
      id++
      return tokenId
    }

    it("Should win battle", async function () {
      const { Item, item, owner, ownerAddress }: ItemFixture = await loadFixture(deployItemFixture);

      const tokenId = await mintNFT(item, owner, 1500, 3000)
      const tx = await item.connect(owner).gameJudge(tokenId)
      console.log(tx)

      const resTx: ContractReceipt = await tx.wait()
      const events = resTx.events
      if (events !== undefined) {
        expect(events[0].args?.user).to.equal(ownerAddress)
        expect(events[0].args?.tokenId).to.equal(tokenId)
        expect(events[0].args?.win).to.equal(true)
      }
      expect(await item.getHp(tokenId)).to.equal(2500)
    })

    it("Should lose battle", async function () {
      const { Item, item, owner, ownerAddress }: ItemFixture = await loadFixture(deployItemFixture);

      const tokenId = await mintNFT(item, owner, 500, 2000)
      const tx = await item.connect(owner).gameJudge(tokenId)
      console.log(tx)

      const resTx: ContractReceipt = await tx.wait()
      const events = resTx.events
      if (events !== undefined) {
        expect(events[0].args?.user).to.equal(ownerAddress)
        expect(events[0].args?.tokenId).to.equal(tokenId)
        expect(events[0].args?.win).to.equal(false)
      }
      expect(await item.getHp(tokenId)).to.equal(0)
    })
  })

  describe("Set Oracle", async function () {
    it("Should setJobId", async function () {
      const { Item, item, owner, ownerAddress }: ItemFixture = await loadFixture(deployItemFixture);
      const jobId = utils.keccak256(utils.toUtf8Bytes("f99a0c8edd5742879833da11d5ada1bd"))
      const tx = await item.connect(owner).setJobId("f99a0c8edd5742879833da11d5ada1bd")
      console.log(tx)
    })
  })
})
