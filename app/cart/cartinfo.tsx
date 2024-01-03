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
  cartId,
  defaultBuyerIdentity,
  checkoutUrl,
}: {
  cartId: string
  defaultBuyerIdentity: BuyerIdentity
  checkoutUrl: string
}) {
  const { adding, cartPrice } = useCart()
  const router = useRouter()
  const [inEditMode, setInEditMode] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [buyerIdentity, setBuyerIdentity] =
    useState<BuyerIdentity>(defaultBuyerIdentity)
  const hasCompleteDetails = useMemo(
    () => Object.values(buyerIdentity).every((value) => value !== ''),
    [buyerIdentity]
  )

  // api fetch
  const updateInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const newBuyerIdentity: BuyerIdentity = {
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      firstName: formData.get('first name') as string,
      lastName: formData.get('last name') as string,
      address1: formData.get('Address 1') as string,
      address2: formData.get('Address 2') as string,
      city: '',
      zip: formData.get('zip') as string,
      country: formData.get('Country') as string,
    }

    fetch(`/api/cart/customer?cartId=${cartId}`, {
      method: 'POST',
      body: JSON.stringify({ customerInfo: newBuyerIdentity }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === '200') {
          setInEditMode(false)
          setBuyerIdentity(data?.body)
        }
      })
      .catch((e) => console.log('An error occurred.\n', e))
      .finally(() => setLoading(false))
  }

  return (
    <>
      <form onSubmit={updateInfo} className='flex flex-col gap-8 w-full overflow-hidden'>
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
            {(inEditMode || loading) && (
              <div className='flex items-stretch justify-start gap-4'>
                <input
                  name='first name'
                  className='w-full h-10 border border-black/40 focus:outline-black px-4 py-2 placeholder:font-light'
                  placeholder='First Name'
                />
                <input
                  name='last name'
                  className='w-full h-10 border border-black/40 focus:outline-black px-4 py-2 placeholder:font-light'
                  placeholder='Last Name'
                />
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
            {(inEditMode || loading) && (
              <input
                name='email'
                className='w-full h-10 border border-black/40 focus:outline-black px-4 py-2 placeholder:font-light'
                placeholder='Email'
              />
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
            {(inEditMode || loading) && (
              <input
                name='phone'
                className='w-full h-10 border border-black/40 focus:outline-black px-4 py-2 placeholder:font-light'
                placeholder='Phone'
              />
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
            {(inEditMode || loading) && (
              <input
                name='zip'
                className='w-full h-10 border border-black/40 focus:outline-black px-4 py-2 placeholder:font-light'
                placeholder='Zip'
              />
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
            {(inEditMode || loading) && (
              <input
                name='Address 1'
                className='w-full h-10 border border-black/40 focus:outline-black px-4 py-2 placeholder:font-light'
                placeholder='Address 1'
              />
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
            {(inEditMode || loading) && (
              <input
                name='Address 2'
                className='w-full h-10 border border-black/40 focus:outline-black px-4 py-2 placeholder:font-light'
                placeholder='Address 2'
              />
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
            {(inEditMode || loading) && (
              <input
                name='Country'
                className='w-full h-10 border border-black/40 focus:outline-black px-4 py-2 placeholder:font-light'
                placeholder='Country'
              />
            )}
          </div>
        </div>
        {inEditMode ? (
          <div className='flex items-center justify-center gap-4'>
            <button
              type='submit'
              disabled={!hasCompleteDetails}
              className='py-4 px-10 shadow-md border border-black/90 leading-none text-2xl font-light text-black/90 bg-transparent hover:bg-gray-300 disabled:border-black/30'
            >
              <Text size='md'>{loading ? 'Saving' : 'Save'}</Text>
            </button>
            <Button onClick={() => setInEditMode(false)}>
              <Text size='md' white>
                Cancel
              </Text>
            </Button>
          </div>
        ) : (
          <Button onClick={() => setInEditMode(true)} outline>
            <div className='flex justify-center gap-4 items-center'>
              <PiPencilSimpleLineThin className='text-2xl text-black' />
              <Text size='md'>Edit</Text>
            </div>
          </Button>
        )}
      </form>
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
          <div className='flex flex-col items-stretch gap-3'>
            <Button
              disabled={adding || !hasCompleteDetails || loading}
              onClick={() => router.push(checkoutUrl)}
            >
              Checkout
            </Button>
            {!hasCompleteDetails && (
              <Text size='xs'>
                * Please fill up your information before checkout.
              </Text>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
