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



const BattleEnemy: NextPage = () => {
  const { setTheme } = useNextTheme()
  function battle() {
    //todo ここに戦闘の記述を書く
  }

  //todo ここのデータを実際のNFTに合わせる
  const data = [
    {
        tokenId: "1",
        imageURL: nft1,
        name:'🌙Yokaze',
        attack:300,
        defence:200,
        HP:500
    },
]

  return (
    <div>

          <div className='summon-image'><Image src={enemy}width={300} height={300} alt="ii" /></div>
     

           <div className='battle-button'> 
          <Button onClick={battle} shadow color="gradient" auto>
          Battle
        </Button>
        </div>
  
    </div>
        
    


    
  )
}

export default BattleEnemy
