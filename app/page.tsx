'use client'

import { PiShoppingCartThin, PiHeartStraightThin } from 'react-icons/pi'
import { Button, Text, TextLink } from './components/elements'
import Card from './components/product/card'

export default function Home() {
  return (
    <div>
      <div className='flex justify-between items-center gap-10'>
        <div className=''>
          <Text size='xl'>Belsac</Text>
        </div>
        <div className='flex justify-center items-stretch w-[40%]'>
          <input placeholder='Search bags' className='grow self-stretch p-4 text-xl font-light border border-black/90 focus:outline-none placeholder:text-black/90 placeholder:text-xl' />
          <Button onClick={() => console.log('Search button clicked')}>
            Search
          </Button>
        </div>
        <div className='flex justify-end items-center gap-4'>
          <PiShoppingCartThin className='text-3xl' />
          <PiHeartStraightThin className='text-3xl' />
        </div>
      </div>
    </div>
  )
}
