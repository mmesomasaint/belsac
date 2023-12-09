export interface MiniProductQueryResult {
  id: string
  title: string
  handle: string
  totalInventory: number
  createdAt: string
  featuredImage: {
    url: string
  }
  priceRange: {
    minVariantPrice: {
      amount: string
    }
  }
  compareAtPriceRange: {
    maxVariantPrice: {
      amount: string
    }
  }
  options: {
    name: string
    values: string[]
  }[]
  collections: {
    nodes: {
      handle: string
      title: string
    }[]
  }
}