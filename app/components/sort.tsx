import { PiArrowDownThin, PiArrowUpThin } from 'react-icons/pi'
import DropDown, { DropItem } from './dropdown'

export default function Sort({ setSort }: { setSort: (sort: string) => void }) {
  return (
    <DropDown title='Sort by' initialActive='Name (asc)'>
      <DropItem value='Name (asc)' onClick={() => setSort('Name (asc)')}>
        <span className='flex justify-center items-center gap-0'>
          <PiArrowUpThin className='text-4xl' />
          Name
        </span>
      </DropItem>
      <DropItem value='Name (desc)' onClick={() => setSort('Name (desc)')}>
        <span className='flex justify-center items-center gap-0'>
          <PiArrowDownThin className='text-4xl' />
          Name
        </span>
      </DropItem>
      <DropItem value='Date (asc)' onClick={() => setSort('Date (asc)')}>
        <span className='flex justify-center items-center gap-0'>
          <PiArrowUpThin className='text-4xl' />
          Date
        </span>
      </DropItem>
      <DropItem value='Date (desc)' onClick={() => setSort('Date (desc)')}>
        <span className='flex justify-center items-center gap-0'>
          <PiArrowDownThin className='text-4xl' />
          Date
        </span>
      </DropItem>
      <DropItem value='Price (asc)' onClick={() => setSort('Price (asc)')}>
        <span className='flex justify-center items-center gap-0'>
          <PiArrowUpThin className='text-4xl' />
          Price
        </span>
      </DropItem>
      <DropItem value='Price (desc)' onClick={() => setSort('Price (desc)')}>
        <span className='flex justify-center items-center gap-0'>
          <PiArrowDownThin className='text-4xl' />
          Price
        </span>
      </DropItem>
    </DropDown>
  )
}
