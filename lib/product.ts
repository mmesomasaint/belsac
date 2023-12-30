export type MiniProduct = {
  id: string
  title: string
  handle: string
  featuredImage: string
  price: number
  compareAtPrice: number
  collectionHandle: string
  createdAt: string
}

export function formatMoney(number: number, dp = 0) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: dp,
    maximumFractionDigits: 2,
  })

  return formatter.format(number)
}

export interface FullProduct {
  id: string
  handle: string
  title: string
  descriptionHtml: string
  images: {
    url: string
    width: number
    height: number
    altText: string
  }[]
  options: {
    name: string
    values: string[]
  }[]
  price: number
  discount: number | null
}
