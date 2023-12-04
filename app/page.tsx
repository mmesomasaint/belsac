'use client'

import { PiShoppingCartThin, PiHeartStraightThin } from 'react-icons/pi'
import { Button, Text, TextLink } from './components/elements'
import Card from './components/product/card'

export default function Home() {
  return (
    <div className='px-7'>
      <div className='flex justify-between items-center gap-10 py-4'>
        <div className=''>
          <Text size='xl'>Belsac</Text>
        </div>
        <div className='flex justify-center items-stretch w-[40%]'>
          <input
            placeholder='Search bags'
            className='grow self-stretch p-4 text-xl font-light border border-black/90 focus:outline-none placeholder:text-black/90 placeholder:text-xl'
          />
          <Button onClick={() => console.log('Search button clicked')}>
            Search
          </Button>
        </div>
        <div className='flex justify-end items-center gap-10'>
          <PiHeartStraightThin className='text-4xl' />
          <PiShoppingCartThin className='text-4xl' />
        </div>
      </div>
      <div className='py-4 mt-10'>
        <div className='flex justify-between items-center gap-10'>
          <Text size='lg'>Featured</Text>
          <Button onClick={() => console.log('Sort clicked')} outline>
            Sort by
          </Button>
        </div>
        <div className='flex justify-start items-center gap-24 mt-4'>
          <Card
            product={{
              title: 'The Classic Handbag By Prada 2023',
              handle: 'the-classic-handbag-by-prada-2023',
              featuredImage:
                'https://images.selfridges.com/is/image/selfridges/R04229467_SAND_M?wid=476&hei=634&fmt=webp&qlt=80,1&bgc=F6F6F6&extend=-18,0,-18,0',
              price: '$200',
              compareAtPrice: '$300',
              collectionHandle: 'prada-handbags',
            }}
          />
          <Card
            product={{
              title: 'The Classic Handbag By Prada 2023',
              handle: 'the-classic-handbag-by-prada-2023',
              featuredImage:
                'https://images.selfridges.com/is/image/selfridges/R04229467_SAND_M?wid=476&hei=634&fmt=webp&qlt=80,1&bgc=F6F6F6&extend=-18,0,-18,0',
              price: '$200',
              compareAtPrice: '$300',
              collectionHandle: 'prada-handbags',
            }}
          />
          <Card
            product={{
              title: 'The Classic Handbag By Prada 2023',
              handle: 'the-classic-handbag-by-prada-2023',
              featuredImage:
                'https://images.selfridges.com/is/image/selfridges/R04229467_SAND_M?wid=476&hei=634&fmt=webp&qlt=80,1&bgc=F6F6F6&extend=-18,0,-18,0',
              price: '$200',
              compareAtPrice: '$300',
              collectionHandle: 'prada-handbags',
            }}
          />
          <Card
            product={{
              title: 'The Classic Handbag By Prada 2023',
              handle: 'the-classic-handbag-by-prada-2023',
              featuredImage:
                'https://images.selfridges.com/is/image/selfridges/R04229467_SAND_M?wid=476&hei=634&fmt=webp&qlt=80,1&bgc=F6F6F6&extend=-18,0,-18,0',
              price: '$200',
              compareAtPrice: '$300',
              collectionHandle: 'prada-handbags',
            }}
          />
        </div>
      </div>
    </div>
  )
}
