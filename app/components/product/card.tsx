import Image from "next/image"
import { Text } from "../elements"

type Props = {
  product: {
    title: string
    featuredImage: string
    price: string
    compareAtPrice: string
  }
}

export default function Card({ product }: Props) {
  return (
    <div className="shadow-lg w-1/4 border border-black/65 flex flex-col gap-0 ">
      <Image src={product.featuredImage} alt={product.title} width={300} height={300} className="grow" />
      <div className="flex flex-col w-fullp-4">
        <div className="flex justify-start items-end gap-3">
          <Text size="md">{product.price}</Text>
          <span className=" line-through"><Text size="xs" faded>{product.compareAtPrice}</Text></span>
        </div>
        <span className="line-clamp-2"><Text size="sm" faded>{product.title}</Text></span>
      </div>
    </div>
  );
}