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


const TitleAccount: NextPage = () => {
  const { setTheme } = useNextTheme()
  const { isDark } = useTheme()

  return (
    <div>
    <p className='title-menu'>Account 🌱</p>
    <p className='title-submenu'>Choose one NFT </p>
    </div>

  )
}

export default TitleAccount
