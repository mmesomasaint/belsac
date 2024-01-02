'use client'

import { useRouter } from 'next/navigation'
import { formatMoney } from "@/lib/product"
import { Button, Text } from "../components/elements"
import useCart from "../hooks/usecart"
import { PiPencilSimpleLineThin } from "react-icons/pi"

export interface BuyerIdentity {
  email: string
  phone: string
  firstName: string
  lastName: string
  address1: string
  address2: string
  city: string
  zip: string
  country: string
}

export default function CartInfo({buyerIdentity, checkoutUrl}: {buyerIdentity: BuyerIdentity, checkoutUrl: string}) {
  const {adding, cartPrice} = useCart()
  const router = useRouter()

  return (
    <>
    <div className='flex flex-col gap-8 w-full overflow-hidden'>
      <Text size='md'>Buyer Information</Text>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between gap-4'>
          <Text size='xs'>Name</Text>
          <span className='text-clamp-1'>
            <Text size='sm'>{`${
              buyerIdentity.firstName ?? '...'
            } ${buyerIdentity.lastName ?? '...'}`}</Text>
          </span>
        </div>
        <div className='flex items-center justify-between gap-4'>
          <Text size='xs'>Email</Text>
          <span className='text-clamp-1'>
            <Text size='sm'>{buyerIdentity.email}</Text>
          </span>
        </div>
        <div className='flex items-center justify-between gap-4'>
          <Text size='xs'>Phone</Text>
          <span className='text-clamp-1'>
            <Text size='sm'>{buyerIdentity.phone}</Text>
          </span>
        </div>
        <div className='flex items-center justify-between gap-4'>
          <Text size='xs'>ZIP</Text>
          <span className='text-clamp-1'>
            <Text size='sm'>{buyerIdentity.zip}</Text>
          </span>
        </div>
        <div className='flex items-center justify-between gap-4'>
          <Text size='xs'>Address 1</Text>
          <span className='text-clamp-1'>
            <Text size='sm'>{buyerIdentity.address1}</Text>
          </span>
        </div>
        <div className='flex items-center justify-between gap-4'>
          <Text size='xs'>Address 2</Text>
          <span className='text-clamp-1'>
            <Text size='sm'>{buyerIdentity.address2}</Text>
          </span>
        </div>
        <div className='flex items-center justify-between gap-4'>
          <Text size='xs'>Country</Text>
          <span className='text-clamp-1'>
            <Text size='sm'>{buyerIdentity.country}</Text>
          </span>
        </div>
      </div>
      <Button
        onClick={() => console.log('Edit Buyer Information')}
        outline
      >
        <div className='flex justify-center gap-4 items-center'>
          <PiPencilSimpleLineThin className='text-2xl text-black' />
          <Text size='md'>Edit</Text>
        </div>
      </Button>
    </div>
    <div className='w-full border-b border-black/40' />
    <div className='flex flex-col gap-8'>
      <Text size='md'>Order Summary</Text>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between gap-4'>
          <Text size='xs'>Tax</Text>
          <Text size='md'>
            {formatMoney(Number(cartPrice.totalTaxAmount))}
          </Text>
        </div>
        <div className='flex items-center justify-between gap-4'>
          <Text size='xs'>Subtotal</Text>
          <Text size='md'>
            {formatMoney(Number(cartPrice.subtotalAmount))}
          </Text>
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between gap-4'>
          <Text size='md'>Total</Text>
          <Text size='xl'>
            {formatMoney(Number(cartPrice.totalAmount))}
          </Text>
        </div>
        <Button
          disabled={adding}
          onClick={() => router.push(checkoutUrl)}
        >
          Checkout
        </Button>
      </div>
    </div>
    </>
  )
}