'use client'

import { useEffect, useState } from 'react'
import { TbShoppingCartOff } from 'react-icons/tb'
import { PiPencilSimpleLineThin, PiTrashSimpleThin } from 'react-icons/pi'
import useCart from '../hooks/usecart'
import { Text } from '../components/elements'
import Image from 'next/image'
import { formatMoney } from '@/lib/product'

interface Attribute {
  key: string
  value: string
}

interface CartLine {
  attributes: Attribute[] | { [key: string]: any }
  id: string
  merchandiseId: string
  quantity: number
  price?: number
  title?: string
  featuredImage?: string
}

interface BuyerIdentity {
  email: string
  phone: string
}

interface Cost {
  subtotalAmount: string
  totalAmount: string
  totalTaxAmount: string
}

interface Cart {
  id: string
  cost: Cost
  cartLines: CartLine[]
  buyerIdentity: BuyerIdentity
}

export default function CartItems() {
  const [loading, setLoading] = useState<boolean>(true)
  const [cart, setCart] = useState<Cart>()
  const { cartId } = useCart()

  const extractAttributes = (lines: CartLine[]) => {
    return lines.map((line) => {
      const attributes = Object.fromEntries(
        line.attributes.map(({ key, value }: Attribute) => [key, value])
      )
      const { price, title, featuredImage, ...rest } = attributes

      return {
        title,
        featuredImage,
        price: Number(price),
        ...line,
        attributes: rest,
      }
    })
  }

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
        .then((data) => {
          console.log('Cart Information: \n', data?.body)
          setCart({
            cartLines: extractAttributes(data?.body?.cartLines),
            ...data?.body,
          })
        })
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
    <div className='grid grid-cols-12 place-content-between items-stretch gap-16 py-6'>
      {loading && (
        <div className='col-span-full flex justify-center mt-12'>
          <Text size='md'>Loading...</Text>
        </div>
      )}
      {cart && (
        <div className='col-span-8 flex flex-col gap-10'>
          {cart.cartLines.map((line) => (
            <CartItem key={line.id} line={line} />
          ))}
        </div>
      )}
    </div>
  )
}

function CartItem({
  line: { id, title, featuredImage, price, quantity },
}: {
  line: CartLine
}) {
  const hasImage = featuredImage && title
  return (
    <div className='relative grid grid-cols-6 place-items-stretch min-h-[20rem] gap-10 p-10 border-b border-black/40 last:border-none'>
      <div className='col-span-2 w-full bg-gray-300'>
        {hasImage && (
          <Image
            src={featuredImage}
            alt={title}
            className='w-full object-cover'
          />
        )}
      </div>
      <div className='col-span-4 w-full flex flex-col gap-6'>
        <Text size='lg'>{title ?? '...'}</Text>
        <Text size='lg' faded>
          {`${quantity.toString() ?? '0'} x ${formatMoney(price ?? 0)}`}
        </Text>
      </div>
      <div className='absolute top-0 right-0 flex items-stretch justify-center gap-4'>
        <button
          type='button'
          onClick={() => console.log(`Line: ${id}, ready for editing!!`)}
          className='w-14 h-14 flex justify-center items-center border border-black hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
          title='Edit line'
        >
          <PiPencilSimpleLineThin className='text-2xl text-black' />
        </button>
        <button
          type='button'
          onClick={() => console.log(`Line: ${id}, deleted!!`)}
          className='w-14 h-14 flex justify-center items-center border border-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
          title='Delete line'
        >
          <PiTrashSimpleThin className='text-2xl text-red-500' />
        </button>
      </div>
    </div>
  )
}
