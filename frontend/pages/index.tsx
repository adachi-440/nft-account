import { Container } from '@nextui-org/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import AccountNFT from '../components/AccountNFT'
import Header from '../components/Header'
import Mainmenu from '../components/Mainmenu'
import Mint from '../components/Mint'
import Title from '../components/Title'
import styles from '../styles/Home.module.css'


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Container>
        <Mint />
      </Container>
      <Title />
      <Mainmenu />
      <AccountNFT />
    </div>
  )
}

export default Home
