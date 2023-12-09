export type MiniProduct = {
  id: string
  title: string
  handle: string
  featuredImage: string
  price: number
  compareAtPrice: string
  collectionHandle: string
}

export function formatMoney(number: number, dp=0) {
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: dp,
    maximumFractionDigits: 2,
  })

  return formatter.format(number)
}