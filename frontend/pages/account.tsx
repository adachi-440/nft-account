import React from "react";
import Head from 'next/head';
import { Text, Spacer, Container } from "@nextui-org/react";
import AccountNFT from "../components/AccountNFT";
import Header from "../components/Header";
import Mainmenu from "../components/Mainmenu";
import Mint from "../components/Mint";
import Title from "../components/Title";
import styles from '../styles/Home.module.css'
import TitleAccount from "../components/TitleAccount";

const AccountPage = () => {
    return (
        <div className={styles.container}>
        <Header />
        <Container>
          <Mint />
        </Container>
        <TitleAccount />
        <AccountNFT />
      </div>
    )
}

export default AccountPage;