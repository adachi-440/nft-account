import type { NextPage } from 'next'
import { useTheme as useNextTheme } from 'next-themes'
import { Button, Link, Navbar, Switch, useTheme, Text } from '@nextui-org/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Image } from "@nextui-org/react";
import account from '../images/account.png'
import nft from '../images/nft.png'



const AccountNFT: NextPage = () => {
  const { setTheme } = useNextTheme()
  const { isDark } = useTheme()

  //todo ここのデータを実際のNFTに合わせる
  const data = [
    {
        tokenId: "1",
        imageURL: "https://n-works.link/newwp/wp-content/uploads/2022/01/nw_tmb420-1024x684.png",
    },
    {
        tokenId: "2",
        imageURL: "USDC",
    },
    {
        tokenId: "3",
        imageURL: "USDC",
    }   
]
  const getNFTdata = async () => {
    
        //if (!window.userAddress) { return }
        const osContainer = document.getElementById('openseaItems')

        //todo userAddressを変数化
        const userAddress="0xa1517Ce827D98A6E525F3Db278BbF34C6EB13E70"


        const options = {method: 'GET'};
        const items = await fetch('https://testnets-api.opensea.io/api/v1/assets?owner=0xa1517Ce827D98A6E525F3Db278BbF34C6EB13E70&order_direction=desc&offset=0&limit=20&include_orders=false', options)
          .then(response => response.json())
          .then((res) => {
            return res.assets
          })
          .catch((e) => {
            console.error(e)
            console.error('Could not talk to OpenSea')
            return null
          })


          if (items.length === 0) { return }

          items.forEach((nft: { name: any; image_url: any; description: any; permalink: any }) => {
            const { name, image_url, description, permalink } = nft
    
            const newElement = document.createElement('div')
            newElement.innerHTML = `
              <!-- Opensea listing item-->
              <a href='${permalink}' target="_blank">
                <div class='flex flex-col'>
                  <img
                    src='${image_url}'
                    class='w-full rounded-lg' />
                  <div class='flex-col w-full space-y-1'>
                    <p class='text-gray-800 text-lg'>${name}</p>
                    <p class='text-gray-500 text-xs word-wrap'>${description ?? ''}</p>
                  </div>
                </div>
              </a>
              <!-- End Opensea listing item-->
            `
    
          })

  }

  return (
    <div style={{borderRadius: '10px', overflow: 'hidden'}}>
    
    <div className="account-nft-list">
      {data &&
        data.map((item, i) => (
          <div key={i}>
            <div className='choose-account-nft'> <Image width={200} height={200}  src={item.imageURL}
      alt="Default Image"
      objectFit="cover" /></div>
          </div>
        ))
      }
    </div>
        
    

    </div>
    
  )
}

export default AccountNFT
