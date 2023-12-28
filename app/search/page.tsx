'use client'

import { PiCaretDownThin } from 'react-icons/pi'
import { Button, Text } from '@/app/components/elements'
import Card from '@/app/components/product/card'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '../components/header'
import useSort from '../hooks/usesort'
import Sort from '../components/sort'

export default function Search() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [loading, setLoading] = useState(false)
  const [afterCursor, setAfterCursor] = useState(null)
  const [hasError, setHasError] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const { products, sort, setSort, sortProducts } = useSort()

  const load = () => {
    setLoading(true)
    setHasError(false)
    setHasMore(false)

    const cursor = afterCursor ?? ''

    fetch(`/api/search?query=${query}&cursor=${cursor}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const results = data.body?.results
        const newProducts =
          products.length > 0 ? [...products, ...results] : results

        sortProducts(newProducts, sort)
        setHasMore(data.body?.pageInfo?.hasNextPage)
        setAfterCursor(data.body?.pageInfo?.after)
      })
      .catch(() => setHasError(true))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
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
              <Button onClick={() => load()} outline>
                <span className='flex justify-center items-center gap-4'>
                  More
                  <PiCaretDownThin className='text-4xl' />
                </span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
