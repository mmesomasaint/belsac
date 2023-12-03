import Image from 'next/image'
import { Text, TextLink } from '../elements'

type Props = {
  product: {
    title: string
    handle: string
    featuredImage: string
    price: string
    compareAtPrice: string
    collectionHandle: string
  }
}

export default function Card({ product }: Props) {
  return (
    <div className='shadow-lg w-1/4 border border-black/65 flex flex-col gap-0 '>
      <Image
        src={product.featuredImage}
        alt={product.title}
        width={300}
        height={300}
        className='grow'
      />
      <div className='flex flex-col w-fullp-4'>
        <div className='flex justify-start items-end gap-3'>
          <Text size='md'>{product.price}</Text>
          <span className=' line-through'>
            <Text size='xs' faded>
              {product.compareAtPrice}
            </Text>
          </span>
        </div>
        <TextLink
          size='sm'
          href={`/collection/${collectionHandle}/product/${handle}`}
        >
          {product.title}
        </TextLink>
      </div>
    </div>
  )
}
