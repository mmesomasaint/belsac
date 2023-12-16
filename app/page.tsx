'use client'

import {
  PiShoppingCartThin,
  PiHeartStraightThin,
  PiCaretRightThin,
  PiArrowDownThin,
  PiArrowUpThin,
} from 'react-icons/pi'
import { Button, Text } from '@/app/components/elements'
import Card from '@/app/components/product/card'
import DropDown, { DropItem } from '@/app/components/dropdown'
import { useEffect, useState } from 'react'
import { MiniProduct } from '@/lib/product'
import {
  sortByDateAsc,
  sortByDateDesc,
  sortByNameAsc,
  sortByNameDesc,
  sortByPriceAsc,
  sortByPriceDesc,
} from '@/lib/sort'

export default function Home() {
  const [products, setProducts] = useState<MiniProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [cursor, setCursor] = useState(null)
  const [hasError, setHasError] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [sort, setSort] = useState('Name (asc)')

  const loadMore = () => {
    setLoading(true)
    setHasError(false)
    setHasMore(false)

    fetch(`/api/products?cursor=${cursor}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.body?.results)
        setHasMore(data.body?.pageInfo?.hasNextPage)
        setCursor(data.body?.pageInfo?.cursor)
      })
      .catch(() => setHasError(true))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    setLoading(true)
    setHasError(false)
    setHasMore(false)

    fetch('/api/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.body?.results)
        setHasMore(data.body?.pageInfo?.hasNextPage)
        setCursor(data.body?.pageInfo?.cursor)
      })
      .catch(() => setHasError(true))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    switch (sort) {
      case 'Name (asc)':
        setProducts(prev => sortByNameAsc(prev))
        break
      case 'Name (desc)':
        setProducts(prev => sortByNameDesc(prev))
        break
      case 'Date (asc)':
        setProducts(prev => sortByDateAsc(prev))
        break
      case 'Date (desc)':
        setProducts(prev => sortByDateDesc(prev))
        break
      case 'Price (asc)':
        setProducts(prev => sortByPriceAsc(prev))
        break
      case 'Price (desc)':
        setProducts(prev => sortByPriceDesc(prev))
        break
      default:
        setProducts(sortByNameAsc(products))
        break
    }
  }, [sort])

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
      <div className='py-4 mt-12'>
        <div className='flex justify-between items-center gap-10'>
          <Text size='lg'>Featured</Text>
          <DropDown title='Sort by' initialActive='Name (asc)'>
            <DropItem value='Name (asc)' onClick={() => setSort('Name (asc)')}>
              <span className='flex justify-center items-center gap-0'>
                <PiArrowUpThin className='text-4xl' />
                Name
              </span>
            </DropItem>
            <DropItem
              value='Name (desc)'
              onClick={() => setSort('Name (desc)')}
            >
              <span className='flex justify-center items-center gap-0'>
                <PiArrowDownThin className='text-4xl' />
                Name
              </span>
            </DropItem>
            <DropItem value='Date (asc)' onClick={() => setSort('Date (asc)')}>
              <span className='flex justify-center items-center gap-0'>
                <PiArrowUpThin className='text-4xl' />
                Date
              </span>
            </DropItem>
            <DropItem
              value='Date (desc)'
              onClick={() => setSort('Date (desc)')}
            >
              <span className='flex justify-center items-center gap-0'>
                <PiArrowDownThin className='text-4xl' />
                Date
              </span>
            </DropItem>
            <DropItem
              value='Price (ascending)'
              onClick={() => setSort('Price (asc)')}
            >
              <span className='flex justify-center items-center gap-0'>
                <PiArrowUpThin className='text-4xl' />
                Price
              </span>
            </DropItem>
            <DropItem
              value='Price (descending)'
              onClick={() => setSort('Price (desc)')}
            >
              <span className='flex justify-center items-center gap-0'>
                <PiArrowDownThin className='text-4xl' />
                Price
              </span>
            </DropItem>
          </DropDown>
        </div>
        <div className='grid grid-cols-4 place-content-between items-stretch gap-16 mt-8'>
          {loading ? (
            <div className='w-full col-span-full flex justify-center items-center'>
              <Text size='md'>Loading...</Text>
            </div>
          ) : hasError ? (
            <div className='w-full col-span-full flex justify-center items-center'>
              <Text size='md'>Something went wrong.</Text>
            </div>
          ) : (
            products.map((product) => (
              <Card key={product.id} product={product} full />
            ))
          )}
          {hasMore && (
            <div className='col-span-full flex justify-center items-center'>
              <Button onClick={loadMore} outline>
                <span className='flex justify-center items-center gap-4'>
                  More
                  <PiCaretRightThin className='text-4xl' />
                </span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
