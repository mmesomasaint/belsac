'use client'

import { PiCaretDownThin } from 'react-icons/pi'
import { Button, Text } from '@/app/components/elements'
import Card from '@/app/components/product/card'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '../components/header'
import useSort from '../hooks/usesort'
import Sort from '../components/sort'
import { Filter } from '@/lib/filter'
import FilterBar from '../components/filter'

export default function Search() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [loading, setLoading] = useState(true)
  const [afterCursor, setAfterCursor] = useState(null)
  const [hasError, setHasError] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [total, setTotal] = useState(0)
  const { products, sort, setSort, sortProducts } = useSort()
  const [filter, setFilter] = useState<Filter>()

  const load = (filterTriggered=false) => {
    setLoading(true)
    setHasError(false)
    setHasMore(false)
    setTotal(0)

    const cursor = afterCursor && !filterTriggered ? afterCursor : ''

    fetch(`/api/search?query=${query}&cursor=${cursor}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filter: filter ?? null }),
    })
      .then((res) => res.json())
      .then((data) => {
        const results = data.body?.results
        const newProducts =
          products.length > 0 && !filterTriggered ? [...products, ...results] : results

        sortProducts(newProducts, sort)
        setHasMore(data.body?.pageInfo?.hasNextPage)
        setAfterCursor(data.body?.pageInfo?.after)
        setTotal(data.body?.total ?? 0)
        !filterTriggered && setFilter(data.body?.filter)
      })
      .catch(() => setHasError(true))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    load(true)
  }, [filter])

  return (
    <div className='px-7 max-w-[120rem] mx-auto'>
      <Header />
      <div className='py-4 mt-12'>
        <div className='grid grid-cols-4 place-content-between items-stretch gap-8'>
          <div className='flex flex-col gap-16 p-8 h-fit w-full ring ring-gray-200'>
            <Text size='lg'>Filter</Text>
            {filter && <FilterBar filter={filter} setFilter={setFilter} />}
          </div>
          <div className='col-span-3 w-full'>
            <div className='flex justify-between items-end gap-10 pb-8'>
              {loading ? (
                <Text size='lg'>&middot;&middot;&middot;</Text>
              ) : (
                <Text size='lg'>
                  {`${total} result${total > 1 ? 's' : ''} for "${
                    query ?? ''
                  }"`}
                </Text>
              )}
              <Sort setSort={setSort} />
            </div>
            <div className='grid grid-cols-3 place-content-between items-stretch gap-16'>
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
                  <Text size='md'>
                    No products found. Search something else.
                  </Text>
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
      </div>
    </div>
  )
}
