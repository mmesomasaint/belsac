'use client'

import { useEffect, useState } from 'react'
import { TbShoppingCartOff } from 'react-icons/tb'
import useCart from '../hooks/usecart'
import { Text } from '../components/elements'

export default function CartItems() {
  const [loading, setLoading] = useState<boolean>(true)
  const { cartId } = useCart()

  useEffect(() => {
    setLoading(true)

    if (cartId) {
      fetch(`/api/cart?cartId=${cartId}&type=1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => console.log('Cart Information: \n', data?.body))
        .finally(() => setLoading(false))
    }

    setLoading(false)
  }, [])

  if (!loading && !cartId)
    return (
      <div className='flex flex-col w-full items-center justify-center mt-20'>
        <TbShoppingCartOff className='text-9xl text-gray-300' />
        <Text size='md' faded>
          Your cart is empty
        </Text>
      </div>
    )

  return (
    <div className='grid grid-cols-12 place-content-between items-stretch gap-8 py-6'>
      {loading && (
        <div className='col-span-full flex justify-center mt-12'>
          <Text size='md'>Loading...</Text>
        </div>
      )}
    </div>
  )
}
