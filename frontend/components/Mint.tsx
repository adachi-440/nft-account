import { Button, Loading } from '@nextui-org/react'
import type { NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react'
import { useSigner, useContract } from 'wagmi'
import { sleep } from '../utils/utils'

const Mint: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const { data: signer } = useSigner()

  const createAccount = async () => {
    await sleep(3000)
    console.log(signer)
  }

  return (
    <div>
      <Button className='space__32' disabled={loading} onPress={() => createAccount()}>
        {loading ? <Loading color='currentColor' size='sm' /> : 'Create Account'}
      </Button>
    </div>
  )
}

export default Mint
