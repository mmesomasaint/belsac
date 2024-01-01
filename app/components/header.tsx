'use client'

import { PiHeartStraightThin, PiShoppingCartThin } from 'react-icons/pi'
import { useRouter } from 'next/navigation'
import { Button, Text } from './elements'
import { useState } from 'react'
import useCart from '../hooks/usecart'

export default function Header({ defaultText }: { defaultText?: string }) {
  const [searchText, setSearchText] = useState(defaultText)
  const { cartSize } = useCart()
  const router = useRouter()

  return (
    <div className='flex justify-between items-center gap-10 py-4'>
      <div className=''>
        <Text size='xl'>Belsac</Text>
      </div>
      <div className='flex justify-center items-stretch w-[40%]'>
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder='Search bags'
          className='grow self-stretch p-4 text-xl font-light border border-black/90 focus:outline-none placeholder:text-black/90 placeholder:text-xl'
        />
        <Button onClick={() => router.push(`/search?q=${searchText}`)}>
          Search
        </Button>
      </div>
      <div className='flex justify-end items-center gap-10'>
        <PiHeartStraightThin className='text-5xl' />
        <button
          type='button'
          onClick={() => router.push('/cart')}
          className='relative w-14 h-14 flex justify-center items-center hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
        >
          <PiShoppingCartThin className='text-5xl' />
          <div className='absolute top-0 right-0 w-6 h-6 flex justify-center items-center bg-black text-white text-xs rounded-full'>
            {cartSize}
          </div>
        </button>
      </div>
    </div>
  )
}
