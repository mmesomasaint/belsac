import { Text } from '@/app/components/elements'
import Header from '@/app/components/header'
import { PiCaretRightThin } from 'react-icons/pi'

export default async function Cart() {
  return (
    <div className='px-7 max-w-[120rem] mx-auto'>
      <Header />
      <div className='py-4 mt-12'>
        <div className='flex justify-start items-center gap-5'>
          <Text size='xs' faded>
            Home
          </Text>
          <PiCaretRightThin className='text-2xl' />
          <Text size='xs' faded>
            Cart
          </Text>
        </div>
        <div className='grid grid-cols-2 place-content-between items-stretch gap-8 py-6'></div>
      </div>
    </div>
  )
}
