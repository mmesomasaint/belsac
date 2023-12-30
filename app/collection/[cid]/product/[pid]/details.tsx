'use client'

import { OptionBox, Text } from '@/app/components/elements'
import { HR } from '@/app/components/filter'
import { formatMoney } from '@/lib/product'

interface DetailsPanelProps {
  title: string
  price: number
  discount: number
  options: { name: string; values: string[] }[]
}

export default function DetailsPanel({
  title,
  price,
  discount,
  options,
}: DetailsPanelProps) {
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
            <div className='flex flex gap-2'>
              {option.values.map((value) => (
                <OptionBox
                  key={value}
                  active={false}
                  onClick={() => {
                    return
                  }}
                >
                  {value}
                </OptionBox>
              ))}
            </div>
          </div>
        ))}
      </HR>
    </>
  )
}
