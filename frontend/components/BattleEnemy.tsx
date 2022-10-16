import type { NextPage } from 'next'
import { useTheme as useNextTheme } from 'next-themes'
import { Button, Link, Navbar, Switch, useTheme, Text, Card, Row } from '@nextui-org/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import nft1 from '../images/NFT1.gif'
import enemy from '../images/enemy.gif'
import nft3 from '../images/NFT3.gif'
import nft4 from '../images/NFT4.gif'
import nft from '../images/nft.png'
import { useSigner, useContract } from 'wagmi'
import { ITEM_CONTRACT, ITEM_ABI } from '../utils/const'
import { toast } from 'react-toastify'

const BattleEnemy: NextPage = () => {
  const { data: signer } = useSigner()
  const contract = useContract({
    address: ITEM_CONTRACT,
    abi: ITEM_ABI,
    signerOrProvider: signer,
  })
  async function battle() {
    //todo ここに戦闘の記述を書く
    if (contract) {
      const tx = await contract.gameJudge(1)
      const t = await tx.wait()
      const events = t.events
      console.log(events)
      if (events !== undefined) {
        if (events[0].args?.win) {
          toast('You Win!')
        } else {
          toast('You Lose...')
        }
      }
    }
  }

  //todo ここのデータを実際のNFTに合わせる
  const data = [
    {
      tokenId: '1',
      imageURL: nft1,
      name: '🌙Yokaze',
      attack: 300,
      defence: 200,
      HP: 500,
    },
  ]

  return (
    <div>
      <div className='summon-image'>
        <Image src={enemy} width={300} height={300} alt='ii' />
      </div>

      <div className='battle-button'>
        <Button onClick={battle} shadow color='gradient' auto>
          Battle
        </Button>
      </div>
    </div>
  )
}

export default BattleEnemy
