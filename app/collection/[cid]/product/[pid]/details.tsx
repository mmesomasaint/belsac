'use client'

import { useEffect, useState } from 'react'
import { Button, MiniBox, OptionBox, Text } from '@/app/components/elements'
import { HR } from '@/app/components/filter'
import { formatMoney } from '@/lib/product'
import useCart from '@/app/hooks/usecart'

interface DetailsPanelProps {
  title: string
  handle: string
  featuredImage: string
  price: number
  discount: number
  options: { name: string; values: string[] }[]
  description: string
}

interface Variant {
  id: string
  sku: string
  price: number
  discount: number
  quantityAvailable: number
}

type SelectedOptions = { name: string; value: string }[]

const extractDefaultOption = (
  options: { name: string; values: string[] }[]
): SelectedOptions => {
  // Extract the first value of every item in the array and store them in this format.
  // [{name: "Color", value: "Bllue"}...]
  return options.map((option) => ({
    name: option.name,
    value: option.values[0],
  }))
}

export default function DetailsPanel({
  title,
  handle,
  featuredImage,
  price,
  discount,
  options,
  description,
}: DetailsPanelProps) {
  const [amount, setAmount] = useState<number>(1)
  const [variant, setVariant] = useState<Variant>()
  const [loading, setLoading] = useState<boolean>(true)
  const { adding, updateCart } = useCart()
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(
    extractDefaultOption(options)
  )

  const setOptionsValues = (name: string, value: string) => {
    const newSelectedOptions = selectedOptions.map((option) => {
      if (option.name === name) {
        return { ...option, value }
      }
      return option
    })

    setSelectedOptions(newSelectedOptions)
  }

  const inSelectedOptions = (name: string, value: string) => {
    return selectedOptions.some(
      (option) => option.name === name && option.value === value
    )
  }

  const addToCart = () => {
    const moreAttributes = [
      ...selectedOptions,
      { name: 'title', value: title },
      { name: 'price', value: (variant?.price ?? price).toString() },
      { name: 'featuredImage', value: featuredImage },
      {
        name: 'maxQuantity',
        value: (variant?.quantityAvailable ?? 0).toString(),
      },
    ]

    const newMerchandise = {
      quantity: amount,
      id: variant?.id ?? '',
      attributes: moreAttributes.map((option) => ({
        key: option.name,
        value: option.value,
      })),
    }

    updateCart(newMerchandise)
  }

  useEffect(() => {
    setLoading(true)

    fetch(`/api/products/variant?handle=${handle}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedOptions }),
    })
      .then((res) => res.json())
      .then((data) => setVariant(data?.body))
      .catch((e) => console.log('An error occurred!', e))
      .finally(() => setLoading(false))
  }, [selectedOptions])

  return (
    <>
      <HR>
        <div className='flex flex-col gap-5 m-6 mb-4'>
          <Text size='xl'>{title}</Text>
          <div className='flex justify-start items-center gap-3'>
            <Text size='lg'>
              {loading ? '...' : formatMoney(variant?.price ?? price)}
            </Text>
            <span className='line-through decoration-from-font'>
              <Text size='sm'>
                {loading ? '...' : formatMoney(variant?.discount ?? discount)}
              </Text>
            </span>
          </div>
        </div>
      </HR>
      <HR>
        {options.map((option) => (
          <div key={option.name} className='flex flex-col gap-5 m-6 mb-4'>
            <Text size='md'>{`${option.name}s`}</Text>
            <div className='flex flex gap-4'>
              {option.values.map((value) => (
                <OptionBox
                  key={value}
                  active={inSelectedOptions(option.name, value)}
                  onClick={() => setOptionsValues(option.name, value)}
                >
                  {value}
                </OptionBox>
              ))}
            </div>
          </div>
        ))}
      </HR>
      <HR>
        <div className='flex flex-col justify-start items-start gap-8 m-6 mb-4'>
          <div className='flex flex-col gap-4'>
            <Text size='md'>Quantity</Text>
            <Text size='sm'>{`Only ${
              loading ? '...' : variant?.quantityAvailable ?? 0
            } item${
              variant?.quantityAvailable ?? 0 > 1 ? 's' : ''
            } left`}</Text>
            <div className='flex justify-start items-center gap-4'>
              <MiniBox
                onClick={() => amount > 1 && setAmount((prev) => prev - 1)}
              >
                -
              </MiniBox>
              <Text size='md'>
                {loading
                  ? '...'
                  : Math.min(
                      amount,
                      variant?.quantityAvailable ?? 0
                    ).toString()}
              </Text>
              <MiniBox
                onClick={() =>
                  amount < (variant?.quantityAvailable ?? 0) &&
                  setAmount((prev) => prev + 1)
                }
              >
                +
              </MiniBox>
            </div>
          </div>
        </div>
      </HR>
      <HR>
        <div className='flex flex-col justify-start items-start gap-8 m-6 mb-4'>
          <div className='flex flex-col gap-4'>
            <Text size='md'>Total</Text>
            <Text size='lg'>
              {loading
                ? '...'
                : formatMoney((variant?.price ?? price) * amount)}
            </Text>
          </div>

          <div className='flex justify-start items-center gap-8'>
            <Button
              onClick={() => console.log('Product bought!!')}
              disabled={(variant?.quantityAvailable ?? 0) < 1 || loading || adding}
            >
              Buy
            </Button>
            <Button
              onClick={addToCart}
              disabled={
                (variant?.quantityAvailable ?? 0) < 1 || loading || adding
              }
              outline
            >
              {adding ? 'Adding' : 'Add to cart'}
            </Button>
          </div>
        </div>
      </HR>
      <div>
        <div className='flex flex-col gap-5 m-6 mb-4'>
          <Text size='md'>Description</Text>
          <Text size='sm' copy>
            {description}
          </Text>
        </div>
      </div>
    </>
  )
}
