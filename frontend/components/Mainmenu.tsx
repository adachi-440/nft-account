import type { NextPage } from 'next'
import { useTheme as useNextTheme } from 'next-themes'
import { Button, Link, Navbar, Switch, useTheme, Text } from '@nextui-org/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import account from '../images/account.png'
import card from '../images/card.png'
import summon from '../images/summon.png'
import option from '../images/option.png'
import battle from '../images/battle.png'


const Mainmenu: NextPage = () => {
  const { setTheme } = useNextTheme()
  const { isDark } = useTheme()

  return (
    <div className="main-menu-list">
    <a href="/account" className='padding-24px'> <Image src={account} width={200} height={266} alt="ii" /></a>

    <a href="/summon" className='padding-24px'> <Image src={summon} width={200} height={266} alt="ii" /></a>

    <a href="/card" className='padding-24px'> <Image src={card} width={200} height={266} alt="ii" /></a>

    <a href="battle" className='padding-24px'> <Image src={battle} width={200} height={266} alt="ii" /></a>

    <a  className='padding-24px'> <Image src={option} width={200} height={266} alt="ii" /></a>


    </div>
    
  )
}

export default Mainmenu
