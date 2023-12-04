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
        <div className=''>
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
