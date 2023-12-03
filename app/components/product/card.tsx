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
  const { title, handle, featuredImage, price, compareAtPrice, collectionHandle } = product

  return (
    <div className='shadow-lg w-1/4 border border-black/65 flex flex-col gap-0 '>
      <Image
        src={featuredImage}
        alt={title}
        width={300}
        height={300}
        className='grow'
      />
      <div className='flex flex-col w-fullp-4'>
        <div className='flex justify-start items-end gap-3'>
          <Text size='md'>{price}</Text>
          <span className=' line-through'>
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
