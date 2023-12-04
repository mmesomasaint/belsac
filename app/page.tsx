'use client'

import { Button, Text, TextLink } from './components/elements'
import Card from './components/product/card'

export default function Home() {
  return (
    <div>
      <Text size='xl'>Belsac</Text>
      <Text size='lg'>Belsac</Text>
      <Text size='md'>Belsac</Text>
      <Text size='sm'>Belsac</Text>
      <Text size='xs'>Belsac</Text>
      <Button
        onClick={() => {
          console.log('clicked')
        }}
      >
        <Text size='sm' white>
          Click me
        </Text>
      </Button>
      <TextLink href='/' size='sm'>
        A Product Name
      </TextLink>
      <div className='flex justify-start items-center gap-10'>
        <Card
          product={{
            title: 'A Product Name For A Beautiful Bag',
            handle: 'a-product-name-for-a-beautiful-bag',
            featuredImage:
              'https://images.selfridges.com/is/image/selfridges/R04229467_SAND_M?wid=476&hei=634&fmt=webp&qlt=80,1&bgc=F6F6F6&extend=-18,0,-18,0',
            price: '$100',
            compareAtPrice: '$200',
            collectionHandle: 'collection-handle',
          }}
        />
        <Card
          product={{
            title: 'A Product Name For A Beautiful Bag',
            handle: 'a-product-name-for-a-beautiful-bag',
            featuredImage:
              'https://images.selfridges.com/is/image/selfridges/R04229467_SAND_M?wid=476&hei=634&fmt=webp&qlt=80,1&bgc=F6F6F6&extend=-18,0,-18,0',
            price: '$100',
            compareAtPrice: '$200',
            collectionHandle: 'collection-handle',
          }}
        />
        <Card
          product={{
            title: 'A Product Name For A Beautiful Bag',
            handle: 'a-product-name-for-a-beautiful-bag',
            featuredImage:
              'https://images.selfridges.com/is/image/selfridges/R04229467_SAND_M?wid=476&hei=634&fmt=webp&qlt=80,1&bgc=F6F6F6&extend=-18,0,-18,0',
            price: '$100',
            compareAtPrice: '$200',
            collectionHandle: 'collection-handle',
          }}
        />
        <Card
          product={{
            title: 'A Product Name For A Beautiful Bag',
            handle: 'a-product-name-for-a-beautiful-bag',
            featuredImage:
              'https://images.selfridges.com/is/image/selfridges/R04229467_SAND_M?wid=476&hei=634&fmt=webp&qlt=80,1&bgc=F6F6F6&extend=-18,0,-18,0',
            price: '$100',
            compareAtPrice: '$200',
            collectionHandle: 'collection-handle',
          }}
        />
        <Card
          product={{
            title: 'A Product Name For A Beautiful Bag',
            handle: 'a-product-name-for-a-beautiful-bag',
            featuredImage:
              'https://images.selfridges.com/is/image/selfridges/R04229467_SAND_M?wid=476&hei=634&fmt=webp&qlt=80,1&bgc=F6F6F6&extend=-18,0,-18,0',
            price: '$100',
            compareAtPrice: '$200',
            collectionHandle: 'collection-handle',
          }}
        />
      </div>
    </div>
  )
}
