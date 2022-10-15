import { Container } from '@nextui-org/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Mint from '../components/Mint'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Container>
        <Mint />
      </Container>
    </div>
  )
}

export default Home
