'use client'

import {
  PiCaretRightThin,
  PiCaretLeftThin,
} from 'react-icons/pi'
import { Button, Text } from '@/app/components/elements'
import Card from '@/app/components/product/card'
import { useEffect, useState } from 'react'
import Header from './components/header'
import useSort from './hooks/usesort'
import Sort from './components/sort'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [beforeCursor, setBeforeCursor] = useState(null)
  const [afterCursor, setAfterCursor] = useState(null)
  const [hasError, setHasError] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [hasPrev, setHasPrev] = useState(false)
  const { products, sort, setSort, sortProducts } = useSort()

  const load = (before?: string | null, after?: string | null) => {
    setLoading(true)
    setHasError(false)
    setHasMore(false)
    setHasPrev(false)

    fetch(`/api/products?before=${before ?? before}&after=${after && after}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        sortProducts(data.body?.results, sort)
        setHasMore(data.body?.pageInfo?.hasNextPage)
        setHasPrev(data.body?.pageInfo?.hasPreviousPage)
        setBeforeCursor(data.body?.pageInfo?.before)
        setAfterCursor(data.body?.pageInfo?.after)
      })
      .catch(() => setHasError(true))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load(null, null)
  }, [])

  return (
    <div className='px-7'>
      <Header />
      <div className='py-4 mt-12'>
        <div className='flex justify-between items-center gap-10'>
          <Text size='lg'>Featured</Text>
          <Sort setSort={setSort} />
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
          <div className='col-span-full flex justify-center items-center gap-8'>
            {hasPrev && (
              <Button onClick={() => load(beforeCursor, null)} outline>
                <span className='flex justify-center items-center gap-4'>
                  <PiCaretLeftThin className='text-4xl' />
                  Prev
                </span>
              </Button>
            )}
            {hasMore && (
              <Button onClick={() => load(null, afterCursor)} outline>
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
