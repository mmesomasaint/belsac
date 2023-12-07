import Image from 'next/image'
import { Text, TextLink } from '../elements'
import { MiniProduct } from '@/lib/product'

export default function Card({ product }: { product: MiniProduct }) {
  const {
    title,
    handle,
    featuredImage,
    price,
    compareAtPrice,
    collectionHandle,
  } = product

  return (
    <div className='shadow-lg w-1/5 border border-black/65 flex flex-col gap-0 group hover:border-black/90'>
      <Image
        src={featuredImage}
        alt={title}
        width={400}
        height={400}
        className='grow'
      />
      <div className='flex flex-col w-full gap-2 p-4'>
        <div className='flex justify-start items-end gap-3'>
          <Text size='lg'>{price}</Text>
          <span className='text-black/80 line-through'>
            <Text size='xs' faded>
              {compareAtPrice}
            </Text>
          </span>
        </div>
        <TextLink
          size='sm'
          href={`/collection/${collectionHandle}/product/${handle}`}
        >
          {title}
        </TextLink>
      </div>
    </div>
  )
}
