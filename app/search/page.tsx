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
import { useSearchParams } from 'next/navigation'
import Header from '../components/header'
import useSort from '../hooks/usesort'

export default function Search() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [loading, setLoading] = useState(false)
  const [afterCursor, setAfterCursor] = useState(null)
  const [hasError, setHasError] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const {products, sort, setSort, sortProducts} = useSort()

  const load = (after?: string | null) => {
    setLoading(true)
    setHasError(false)
    setHasMore(false)

    fetch(`/api/search?query=${query}&cursor=${after && after}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const results = data.body?.results
        const newProducts =
          products.length > 0 ? [...products, results] : results
        sortProducts(newProducts, sort)
        setHasMore(data.body?.pageInfo?.hasNextPage)
        setAfterCursor(data.body?.pageInfo?.after)
      })
      .catch(() => setHasError(true))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load(null)
  }, [])

  return (
    <div className='px-7'>
      <Header />
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
          ) : products.length < 1 ? (
            <div className='w-full col-span-full flex justify-center items-center'>
              <Text size='md'>No products found. Search something else.</Text>
            </div>
          ) : (
            products.map((product) => (
              <Card key={product.id} product={product} full />
            ))
          )}
          <div className='col-span-full flex justify-center items-center gap-8'>
            {hasMore && (
              <Button onClick={() => load(afterCursor)} outline>
                <span className='flex justify-center items-center gap-4'>
                  More
                  <PiCaretRightThin className='text-4xl' />
                </span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
