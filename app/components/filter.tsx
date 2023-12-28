import { useState, ReactNode } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import { PiCaretDownThin } from 'react-icons/pi'
import type { Filter, FilterSubKey } from '@/lib/filter'
import { Text } from './elements'

export default function FilterBar({
  filter,
  setFilter,
}: {
  filter: Filter
  setFilter: (filter: Filter) => void
}) {
  const setPrice = (min: number, max: number) => {
    const newFilter: Filter = {
      ...filter,
      ['price']: { highest: filter.price.highest as number, min, max },
    }
    setFilter(newFilter)
  }

  return (
    <div className='flex flex-col w-full justify-start h-fit gap-16'>
      <HR>
        <Accordion title='Price'>
          <PriceRangeButton
            minPrice={filter.price.min as number}
            maxPrice={filter.price.max as number}
            onRangeClick={setPrice}
          />
        </Accordion>
      </HR>
      {Object.keys(filter)
        .filter((key) => key !== 'price')
        .map((key) => (
          <HR>
            <Accordion title={key}>
              {Object.keys(filter[key]).map((subKey) => (
                <div className='flex flex-col gap-4'>
                  <KeySelector
                    check={(filter[key] as FilterSubKey)[subKey] as boolean}
                    setCheck={(prev) => {
                      const newFilter: Filter = {
                        ...filter,
                        [key]: { ...filter[key], [subKey]: prev },
                      }
                      setFilter(newFilter)
                    }}
                  >
                    {subKey}
                  </KeySelector>
                </div>
              ))}
            </Accordion>
          </HR>
        ))}
    </div>
  )
}

interface KeySelectorProps {
  children: string
  check?: boolean
  setCheck?: (prev: boolean) => void
}

const KeySelector: React.FC<KeySelectorProps> = ({
  check,
  setCheck,
  children,
}) => {
  return (
    <div
      className='flex justify-start items-center gap-4'
      onClick={() => setCheck?.(!check)}
    >
      <div
        className={`w-[1.58rem] h-[1.58rem] rounded-md flex justify-center items-center border ${
          check ? 'border-black' : 'border-black/20'
        }`}
      >
        {check && <BsCheckLg className='text-4xl text-black' />}
      </div>
      <Text size='sm' faded={!check}>
        {children}
      </Text>
    </div>
  )
}

interface AccordionProps {
  title: string
  children: ReactNode[] | ReactNode
  defaultOpen?: boolean
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  defaultOpen,
  children,
}) => {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className='w-full'>
      <div
        className='flex justify-between items-center gap-8 capitalize'
        onClick={() => setOpen((prev) => !prev)}
      >
        <Text size='md'>{title}</Text>
        <PiCaretDownThin className={`${open && 'rotate-180'} text-4xl`} />
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          open ? 'block max-h-full' : 'max-h-0 hidden'
        } relative flex flex-col gap-3 items-start justify-start mt-3`}
      >
        {children}
      </div>
    </div>
  )
}

interface HRProps {
  dashed?: boolean
  children?: React.ReactNode
}

const HR: React.FC<HRProps> = ({ dashed, children }) => {
  return (
    <div
      className={`border-b ${
        dashed && 'border-dashed'
      } border-black/20 w-full ${children && 'pb-3'}`}
    >
      {children}
    </div>
  )
}

interface PriceRangeButtonProps {
  minPrice: number
  maxPrice: number
  onRangeClick: (min: number, max: number) => void
}

const PriceRangeButton: React.FC<PriceRangeButtonProps> = ({
  minPrice,
  maxPrice,
  onRangeClick,
}) => {
  const [selectedRange, setSelectedRange] = useState([minPrice, maxPrice])

  const handleRangeClick = (min: number, max: number) => {
    setSelectedRange([min, max])
    onRangeClick(min, max)
  }

  function createPriceRanges(numRanges = 8) {
    const stepAmount = (maxPrice - minPrice) / (numRanges - 1) // Calculate step size

    const ranges = []
    let currentPrice = minPrice

    for (let i = 0; i < numRanges; i++) {
      if (currentPrice >= maxPrice) break
      const maxRangePrice = Math.min(currentPrice + stepAmount, maxPrice) // Ensure max doesn't exceed maxPrice
      ranges.push({
        min: currentPrice,
        max: maxRangePrice,
        label: `${currentPrice.toFixed(2)} - ${maxRangePrice.toFixed(2)}`, // Format label
      })
      currentPrice = maxRangePrice + 0.01 // Slight offset for non-overlapping ranges
    }

    return ranges
  }

  return (
    <div className='flex flex-wrap gap-4'>
      {createPriceRanges().map(({ label, min, max }) => (
        <button
          key={label}
          className={`px-4 py-2 border border-black/20 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
            selectedRange[0] === min && selectedRange[1] === max
              ? 'bg-black text-white'
              : ''
          }`}
          onClick={() => handleRangeClick(min, max)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export { KeySelector, Accordion, HR, PriceRangeButton }
