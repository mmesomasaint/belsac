'use client'

import { Button, OptionBox, Text } from '@/app/components/elements'
import { HR } from '@/app/components/filter'
import { formatMoney } from '@/lib/product'
import { useEffect, useState } from 'react'

interface DetailsPanelProps {
  title: string
  price: number
  discount: number
  options: { name: string; values: string[] }[]
  description: string
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
  price,
  discount,
  options,
  description,
}: DetailsPanelProps) {
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

  useEffect(() => {
    const handle = title.split(' ').join('-')

    fetch(`/api/products/variant?handle=${handle}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedOptions }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data?.body))
      .catch(() => console.log('An error occurred!'))
  }, [selectedOptions])

  return (
    <>
      <HR>
        <div className='flex flex-col gap-5 m-3 mb-1'>
          <Text size='xl'>{title}</Text>
          <div className='flex justify-start items-center gap-3'>
            <Text size='lg'>{formatMoney(price)}</Text>
            <span className='line-through decoration-from-font'>
              <Text size='sm'>{formatMoney(discount)}</Text>
            </span>
          </div>
        </div>
      </HR>
      <HR>
        {options.map((option) => (
          <div key={option.name} className='flex flex-col gap-5 m-3 mb-1'>
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
        <div>
          <div className='flex flex-col gap-5 m-3 mb-1'>
            <Text size='md'>Description</Text>
            <Text size='sm' copy>
              {description}
            </Text>
          </div>
        </div>
      </HR>
      <div className='flex justify-center items-center gap-8 m-3'>
        <Button onClick={() => console.log('Product bought!!')}>Buy</Button>
        <Button onClick={() => console.log('Added to cart')} outline>
          Add to cart
        </Button>
      </div>
    </>
  )
}
