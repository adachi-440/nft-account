import type { NextPage } from 'next'
import { useTheme as useNextTheme } from 'next-themes'
import { Button, Link, Navbar, Switch, useTheme, Text } from '@nextui-org/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Image } from '@nextui-org/react'
import account from '../images/account.png'
import nft from '../images/nft.png'
import { useSigner, useContract } from 'wagmi'
import { ITEM_CONTRACT, ITEM_ABI, ACCOUNT_CONTRACT, ACCOUNT_ABI } from '../utils/const'
import { toast } from 'react-toastify'

const AccountNFT: NextPage = () => {
  const { setTheme } = useNextTheme()
  const { isDark } = useTheme()
  const { data: signer } = useSigner()
  const contract = useContract({
    address: ACCOUNT_CONTRACT,
    abi: ACCOUNT_ABI,
    signerOrProvider: signer,
  })

  function showETHNFTs() {
    const options = { method: 'GET' }

    const res = fetch(
      'https://testnets-api.opensea.io/api/v1/assets?owner=0x20f115dce7452A853824f302d8985aaCB645C4a9&offset=0&limit=20&include_orders=false',
      options,
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err))
  }

  //todo ここのデータを実際のNFTに合わせる getNFTdata のopenseaのapiを対応させる
  const data = [
    {
      tokenId: '1',
      image_url: 'https://n-works.link/newwp/wp-content/uploads/2022/01/nw_tmb420-1024x684.png',
    },
    {
      tokenId: '2',
      image_url: 'USDC',
    },
    {
      tokenId: '3',
      image_url: 'USDC',
    },
  ]
  const getNFTdata = async () => {
    //if (!window.userAddress) { return }
    const osContainer = document.getElementById('openseaItems')
    //todo userAddressを変数化
    const userAddress = '0xa1517Ce827D98A6E525F3Db278BbF34C6EB13E70'

    const options = { method: 'GET' }
    const items = await fetch(
      'https://testnets-api.opensea.io/api/v1/assets?owner=0xa1517Ce827D98A6E525F3Db278BbF34C6EB13E70&order_direction=desc&offset=0&limit=20&include_orders=false',
      options,
    )
      .then((response) => response.json())
      .then((res) => {
        return res.assets
      })
      .catch((e) => {
        console.error(e)
        console.error('Could not talk to OpenSea')
        return null
      })

    if (items.length === 0) {
      return
    }
    console.log(items.length)

    var nftlist = ''

    items.forEach((nft: { name: any; image_url: any; description: any; permalink: any }) => {
      const { name, image_url, description, permalink } = nft

      console.log({ image_url })
      nftlist =
        nftlist +
        `
             <Image width=${200} height=${200}  src=${image_url}
      alt="Default Image"
      objectFit="cover" />
          `
    })
    const element: HTMLElement = document.getElementById('openseaItems') as HTMLElement
    element.innerHTML = nftlist
  }

  const createAccount = async () => {
    const data = {
      srcContract: ITEM_CONTRACT,
      tokenIds: [1],
    }
    if (contract) {
      const tx = await contract.mint(data, { gasLimit: 200000 })
      const t = await tx.wait()
      const events = t.events
      console.log(events)
      if (events !== undefined) {
        if (events[0].args?.win) {
          toast('Mint Complete!')
        } else {
          toast('Mint Failed')
        }
      }
    }
  }

  return (
    <div style={{ borderRadius: '10px', overflow: 'hidden' }}>
      <div id='openseaItems'></div>
      <div className='account-nft-list'>
        {data &&
          data.map((item, i) => (
            <div key={i}>
              <div className='choose-account-nft'>
                {' '}
                <Image width={200} height={200} src={item.image_url} alt='Default Image' objectFit='cover' />
              </div>
            </div>
          ))}
      </div>
      <Button onPress={() => createAccount()}>Create Account</Button>
      {/* <button onClick={getNFTdata}>ww</button> */}
    </div>
  )
}

export default AccountNFT
