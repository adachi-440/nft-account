import type { NextPage } from 'next'
import { useTheme as useNextTheme } from 'next-themes'
import { Button, Link, Navbar, Switch, useTheme, Text } from '@nextui-org/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import account from '../images/account.png'
import card from '../images/card.png'
import maho from '../images/maho.png'
import option from '../images/option.png'
import battle from '../images/battle.png'
import { useRef, useEffect } from 'react'



const SummonNFT: NextPage = () => {
  const { setTheme } = useNextTheme()
  const { isDark } = useTheme()
  function SummonNFT() {
    //todo ここにNFTmintの処理を入れる
    window.confirm("これが確認ダイアログです。");
  }



  return (
    <div　className='summon-image'>
       <button className='clear-decoration' onClick={SummonNFT}> <Image src={maho}width={450} height={400} alt="ii" /> </button>

    </div>
    
  )
}

export default SummonNFT
