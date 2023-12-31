'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { TbShoppingCartOff } from 'react-icons/tb'
import { PiPencilSimpleLineThin, PiTrashSimpleThin } from 'react-icons/pi'
import { TfiClose, TfiCheck } from 'react-icons/tfi'
import useCart from '../hooks/usecart'
import { Button, MiniBox, Text } from '../components/elements'
import Image from 'next/image'
import { formatMoney } from '@/lib/product'
import CartInfo, { BuyerIdentity } from './cartinfo'

interface Attribute {
  key: string
  value: string
}

interface CartLine {
  attributes: Attribute[]
  optionAttributes: { [key: string]: any }
  id: string
  merchandiseId: string
  quantity: number
  price?: number
  title?: string
  featuredImage?: string
  maxQuantity?: number
}

interface Cart {
  id: string
  checkoutUrl: string
  cartLines: CartLine[]
  buyerIdentity: BuyerIdentity
}

export default function CartItems() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [cart, setCart] = useState<Cart>()
  const { adding, cartId, cartPrice, deleteLine, editLine } = useCart()

  const extractAttributes = (lines: CartLine[]) => {
    return lines.map((line) => {
      const attributes = Object.fromEntries(
        line.attributes.map(({ key, value }: Attribute) => [key, value])
      )
      const { price, title, featuredImage, maxQuantity, ...rest } = attributes

      return {
        title,
        featuredImage,
        price: Number(price),
        maxQuantity: Number(maxQuantity),
        ...line,
        optionAttributes: rest,
      }
    })
  }

  const deleteCartLine = (line: CartLine) => {
    if (cart) {
      // Rmove the line from the cart
      const newCartLines = cart?.cartLines.filter(({ id }) => id !== line.id)
      setCart({ ...cart, cartLines: newCartLines })

      // Remove the line from store db
      deleteLine(line)
    }
  }

  const editCartLine = (oldLine: CartLine, newAmount: number) => {
    if (cart) {
      const newLine = { ...oldLine, quantity: newAmount }

      // Edit the line in the cart
      const updatedCartLines = cart?.cartLines.map((line) => {
        if (line.id === newLine.id) {
          return newLine
        }

        return line
      })

      setCart({ ...cart, cartLines: updatedCartLines })

      // CartLine here should match the object structure of db cartline
      const editedLine = {
        id: newLine.id,
        merchandiseId: newLine.merchandiseId,
        quantity: newLine.quantity,
        attributes: newLine.attributes,
      }

      editLine(editedLine)
    }
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
        .then((data) =>
          setCart({
            ...data?.body,
            cartLines: extractAttributes(data?.body.cartLines),
          })
        )
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
        <>
          <div className='col-span-8 flex flex-col gap-10'>
            {cart.cartLines.map((line) => (
              <CartItem
                key={line.id}
                line={line}
                deleteLine={deleteCartLine}
                editLine={editCartLine}
              />
            ))}
          </div>
          <div className='col-span-4 flex flex-col gap-16 p-8 h-fit w-full ring ring-gray-200'>
            <CartInfo
              cartId={cart.id}
              defaultBuyerIdentity={cart.buyerIdentity}
              checkoutUrl={cart.checkoutUrl}
            />
          </div>
        </>
      )}
    </div>
  )
}

function CartItem({
  line,
  deleteLine,
  editLine,
}: {
  line: CartLine
  deleteLine: (line: CartLine) => void
  editLine: (line: CartLine, newAmount: number) => void
}) {
  const [inEditMode, setInEditMode] = useState(false)
  const {
    title,
    featuredImage,
    price,
    quantity,
    maxQuantity,
    optionAttributes,
  } = line
  const [newAmount, setNewAmount] = useState(quantity)
  const hasImage = featuredImage && title
  const options = Object.entries(optionAttributes)
    .map(([key, value]) => value)
    .join('.|.')
    .split('.')

  const EditModeControl = () => (
    <div className='flex justify-start items-center gap-4'>
      <button
        type='button'
        onClick={() => {
          editLine(line, newAmount)
          setInEditMode(false)
        }}
        className='w-14 h-14 flex justify-center items-center border border-black hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
        title='Save line edit'
      >
        <TfiCheck className='text-2xl text-black' />
      </button>
      <button
        type='button'
        onClick={() => {
          setNewAmount(quantity)
          setInEditMode(false)
        }}
        className='w-14 h-14 flex justify-center items-center border border-black bg-black hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
        title='Cancel line edit'
      >
        <TfiClose className='text-2xl text-white' />
      </button>
    </div>
  )

  const EditAmountPanel = () => (
    <div className='flex justify-start items-center gap-4'>
      <MiniBox
        onClick={() => newAmount > 1 && setNewAmount((prev) => prev - 1)}
      >
        -
      </MiniBox>
      <Text size='md'>{newAmount.toString()}</Text>
      <MiniBox
        onClick={() =>
          newAmount < (maxQuantity ?? 0) && setNewAmount((prev) => prev + 1)
        }
      >
        +
      </MiniBox>
    </div>
  )

  return (
    <div className='relative grid grid-cols-9 place-items-stretch min-h-[20rem] xl:gap-16 gap-8 py-16 px-8 border-b border-black/40 last:border-none'>
      <div className={`col-span-2 w-full ${!hasImage && 'bg-gray-300'}`}>
        {hasImage && (
          <Image
            src={featuredImage}
            alt={title}
            width={400}
            height={400}
            className='w-full object-cover'
          />
        )}
      </div>
      <div className='col-span-7 w-full flex flex-col gap-6'>
        <Text size='lg'>{title ?? '...'}</Text>
        <div className='flex justify-start items-center gap-6'>
          {inEditMode ? (
            <EditAmountPanel />
          ) : (
            <Text size='lg'>{quantity.toString()}</Text>
          )}
          <Text size='lg'>x</Text>
          <Text size='lg'>{formatMoney(price ?? 0)}</Text>
        </div>
        <div className='flex justify-start items-center gap-6'>
          {options.map((option, id) => (
            <Text key={option + id} size='md'>
              {option}
            </Text>
          ))}
        </div>
      </div>
      <div className='absolute top-0 right-0 flex items-stretch justify-center gap-4'>
        {inEditMode ? (
          <EditModeControl />
        ) : (
          <button
            type='button'
            onClick={() => setInEditMode(true)}
            className='w-14 h-14 flex justify-center items-center border border-black hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
            title='Edit line'
          >
            <PiPencilSimpleLineThin className='text-2xl text-black' />
          </button>
        )}
        <button
          type='button'
          onClick={() => deleteLine(line)}
          className='w-14 h-14 flex justify-center items-center border border-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
          title='Delete line'
        >
          <PiTrashSimpleThin className='text-2xl text-red-500' />
        </button>
      </div>
    </div>
  )
}
