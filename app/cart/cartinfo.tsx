'use client'

import { useRouter } from 'next/navigation'
import { formatMoney } from '@/lib/product'
import { Button, Text } from '../components/elements'
import useCart from '../hooks/usecart'
import { PiPencilSimpleLineThin } from 'react-icons/pi'
import { useMemo, useState } from 'react'

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

export default function CartInfo({
  defaultBuyerIdentity,
  checkoutUrl,
}: {
  defaultBuyerIdentity: BuyerIdentity
  checkoutUrl: string
}) {
  const { adding, cartPrice } = useCart()
  const router = useRouter()
  const [inEditMode, setInEditMode] = useState<boolean>(false)
  const [buyerIdentity, setBuyerIdentity] = useState<BuyerIdentity>(defaultBuyerIdentity)
  const hasCompleteDetails = useMemo(() => Object.values(buyerIdentity).some(
    (value) => value === ''
  ), [buyerIdentity])

  return (
    <>
      <div className='flex flex-col gap-8 w-full overflow-hidden'>
        <Text size='md'>Buyer Information</Text>
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-2 items-stretch'>
          <div className='flex items-center justify-between gap-4'>
            <Text size='xs'>Name</Text>
            {!inEditMode && (
            <span className='text-clamp-1'>
              <Text size='sm'>{`${buyerIdentity.firstName ?? '...'} ${
                buyerIdentity.lastName ?? '...'
              }`}</Text>
            </span>
            )}
          </div>
          {inEditMode && (
            <div className='flex items-stretch justify-start gap-4'>
              <input name='first name' value={buyerIdentity.firstName} className='w-full h-10 border border-black/40 px-4 py-2 placeholder:font-light' placeholder='First Name' />
              <input name='last name' value={buyerIdentity.lastName} className='w-full h-10 border border-black/40 px-4 py-2 placeholder:font-light' placeholder='Last Name' />
            </div>
          )}
          </div>
          <div className='flex flex-col gap-2 items-stretch'>
          <div className='flex items-center justify-between gap-4'>
            <Text size='xs'>Email</Text>
            {!inEditMode && (
            <span className='text-clamp-1'>
              <Text size='sm'>{buyerIdentity.email}</Text>
            </span>
            )}
          </div>
          {inEditMode && (<input name='email' value={buyerIdentity.email} className='w-full h-10 border border-black/40 px-4 py-2 placeholder:font-light' placeholder='Email' />
          )}
          </div>
          <div className='flex flex-col gap-2 items-stretch'>
          <div className='flex items-center justify-between gap-4'>
            <Text size='xs'>Phone</Text>
            {!inEditMode && (
            <span className='text-clamp-1'>
              <Text size='sm'>{buyerIdentity.phone}</Text>
            </span>
            )}
          </div>
          {inEditMode && (<input name='phone' value={buyerIdentity.phone} className='w-full h-10 border border-black/40 px-4 py-2 placeholder:font-light' placeholder='Phone' />
          )}
          </div>
          <div className='flex flex-col gap-2 items-stretch'>
          <div className='flex items-center justify-between gap-4'>
            <Text size='xs'>ZIP</Text>
            {!inEditMode && (
            <span className='text-clamp-1'>
              <Text size='sm'>{buyerIdentity.zip}</Text>
            </span>
            )}
          </div>
          {inEditMode && (<input name='zip' value={buyerIdentity.zip} className='w-full h-10 border border-black/40 px-4 py-2 placeholder:font-light' placeholder='Zip' />
          )}
          </div>
          <div className='flex flex-col gap-2 items-stretch'>
          <div className='flex items-center justify-between gap-4'>
            <Text size='xs'>Address 1</Text>
            {!inEditMode && (
            <span className='text-clamp-1'>
              <Text size='sm'>{buyerIdentity.address1}</Text>
            </span>
            )}
          </div>
          {inEditMode && (<input name='Address 1' value={buyerIdentity.address1} className='w-full h-10 border border-black/40 px-4 py-2 placeholder:font-light' placeholder='Address 1' />
          )}
          </div>
          <div className='flex flex-col gap-2 items-stretch'>
          <div className='flex items-center justify-between gap-4'>
            <Text size='xs'>Address 1</Text>
            {!inEditMode && (
            <span className='text-clamp-1'>
              <Text size='sm'>{buyerIdentity.address1}</Text>
            </span>
            )}
          </div>
          {inEditMode && (<input name='Address 1' value={buyerIdentity.address1} className='w-full h-10 border border-black/40 px-4 py-2 placeholder:font-light' placeholder='Address 1' />
          )}
          </div>
          <div className='flex flex-col gap-2 items-stretch'>
          <div className='flex items-center justify-between gap-4'>
            <Text size='xs'>Address 2</Text>
            {!inEditMode && (
            <span className='text-clamp-1'>
              <Text size='sm'>{buyerIdentity.address2}</Text>
            </span>
            )}
          </div>
          {inEditMode && (<input name='Address 2' value={buyerIdentity.address2} className='w-full h-10 border border-black/40 px-4 py-2 placeholder:font-light' placeholder='Address 2' />
          )}
          </div>
          <div className='flex flex-col gap-2 items-stretch'>
          <div className='flex items-center justify-between gap-4'>
            <Text size='xs'>Country</Text>
            {!inEditMode && (
            <span className='text-clamp-1'>
              <Text size='sm'>{buyerIdentity.country}</Text>
            </span>
            )}
          </div>
          {inEditMode && (<input name='Country' value={buyerIdentity.country} className='w-full h-10 border border-black/40 px-4 py-2 placeholder:font-light' placeholder='Country' />
          )}
          </div>
        </div>
        {inEditMode ? (
          <div className='flex items-center justify-center gap-4'>
            <Button
              disabled={!hasCompleteDetails}
              onClick={() => setInEditMode(false)}
              outline
            >
            <Text size='md'>Save</Text>
            </Button>
            <Button
              onClick={() => setInEditMode(false)}
            >
            <Text size='md' white>Cancel</Text>
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setInEditMode(true)}
            outline
          >
          <div className='flex justify-center gap-4 items-center'>
            <PiPencilSimpleLineThin className='text-2xl text-black' />
            <Text size='md'>Edit</Text>
          </div>
          </Button>
        )}
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
            <Text size='xl'>{formatMoney(Number(cartPrice.totalAmount))}</Text>
          </div>
          <Button
            disabled={adding || !hasCompleteDetails}
            onClick={() => router.push(checkoutUrl)}
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  )
}
