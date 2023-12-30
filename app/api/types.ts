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

export interface SearchProductsQueryResult {
  totalCount: number
  edges: {
    node: MiniProductQueryResult
    cursor: string
  }[]
  pageInfo: {
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}

export interface RetrieveProductQueryResult {
  id: string
  handle: string
  title: string
  descriptionHtml: string
  description: string
  images: {
    nodes: {
      url: string
      width: number
      height: number
      altText: string
    }[]
  }
  options: {
    name: string
    values: string[]
  }[]
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
}

export interface GetVariantQueryResult {
  handle: string
  variantBySelectedOptions: {
    id: string
    sku: string
    price: {
      amount: string
    }
    compareAtPrice: {
      amount: string
    }
    quantityAvailable: number
  }
}