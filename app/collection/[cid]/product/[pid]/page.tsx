import { RETRIEVE_A_PRODUCT } from '@/app/api/query'
import { cleanProduct } from '@/app/api/utils'
import { Text } from '@/app/components/elements'
import Header from '@/app/components/header'
import ProductSlider from '@/app/components/product/slider'
import { shopifyFetch } from '@/lib/fetch'
import { PiCaretRightThin } from 'react-icons/pi'
import DetailsPanel from './details'

const getProduct = async (handle: string) => {
  const variables = {
    handle,
  }

  const { status, body } = await shopifyFetch({
    query: RETRIEVE_A_PRODUCT,
    variables,
  })

  if (status === 200) {
    return cleanProduct(body.data?.product)
  }
}

export default async function Product({
  params,
}: {
  params: { cid: string; pid: string }
}) {
  const { cid, pid } = params
  const product = await getProduct(pid)

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
            {cid.split('-').join(' ')}
          </Text>
          <PiCaretRightThin className='text-2xl' />
          <Text size='xs' faded>
            {product?.title ?? ''}
          </Text>
        </div>
        <div className='grid grid-cols-2 place-content-between items-stretch gap-8 py-6'>
          <div className='col-span-1'>
            <ProductSlider images={product?.images ?? []} />
          </div>
          <div className='col-span-1'>
            <DetailsPanel
              title={product?.title ?? '...'}
              handle={product?.handle ?? ''}
              featuredImage={product?.images[0].url ?? ''}
              price={product?.price ?? 0}
              discount={product?.discount ?? 0}
              options={product?.options ?? []}
              description={product?.description ?? '...'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
