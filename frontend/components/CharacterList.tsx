import type { NextPage } from 'next'
import { useTheme as useNextTheme } from 'next-themes'
import { Button, Link, Navbar, Switch, useTheme, Text, Card, Row } from '@nextui-org/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import nft1 from '../images/NFT1.gif'
import nft2 from '../images/NFT2.gif'
import nft3 from '../images/NFT3.gif'
import nft4 from '../images/NFT4.gif'
import nft from '../images/nft.png'

const CharacterList: NextPage = () => {
  //TODO 自分が持っているNFTだけ表示するが、コンラクト経由ではなく、直接表示させる
  const data = [
    {
      tokenId: '1',
      imageURL: nft1,
      name: '🌙Yokaze',
      attack: 300,
      defence: 200,
      HP: 500,
    },
    {
      tokenId: '2',
      imageURL: nft2,
      name: '🌟Sora',
      attack: 300,
      defence: 500,
      HP: 700,
    },
    {
      tokenId: '3',
      imageURL: nft3,
      name: '🌱Maki',
      attack: 400,
      defence: 600,
      HP: 1000,
    },
    {
      tokenId: '4',
      imageURL: nft4,
      name: '🗡Sakuya',
      attack: 250,
      defence: 300,
      HP: 600,
    },
  ]

  return (
    <div className='account-nft-list'>
      {data &&
        data.map((item, i) => (
          <div key={i}>
            <div className='character-list'>
              <Card isHoverable css={{ mw: '250px' }}>
                <Card.Header>
                  <Text b>
                    {item.name} HP:{item.HP}
                  </Text>
                </Card.Header>
                <Card.Divider />
                <Card.Body css={{ py: '$10' }}>
                  <Image src={item.imageURL} width={300} height={300} alt='ii' />
                </Card.Body>
                <Card.Divider />
                <Card.Footer>
                  <Row justify='flex-start'>
                    <Text>⚔ATK:{item.attack}</Text>
                    <Text>🛡DEF:{item.defence}</Text>
                  </Row>
                </Card.Footer>
              </Card>
            </div>
          </div>
        ))}
    </div>
  )
}

export default CharacterList
