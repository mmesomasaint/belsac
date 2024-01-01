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

export interface CartLine {
  id: string
  quantity: number
  merchandise: {
    id: string
  }
  attributes: {
    key: string
    value: string
  }[]
}

export interface Cost {
  totalAmount: {
    amount: number
    currencyCode: string
  }
  subtotalAmount: {
    amount: number
    currencyCode: string
  }
  totalTaxAmount: {
    amount: number
    currencyCode: string
  }
}

export interface MiniCartQueryResult {
  id: string
  lines: {
    nodes: CartLine[]
  }
  cost: Cost
}

export interface Merchandise {
  quantity: number
  id: string
  attributes: {
    key: string
    value: string
  }[]
}

export interface FullCartQueryResult {
  id: string
  lines: {
    nodes: CartLine[]
  }
  attributes: {
    key: string
    value: string
  }[]
  buyerIdentity: {
    email: string
    phone: string
    customer: {
      id: string
    }
    countryCode: string
    deliveryAddressPreferences: {
      address1: string
      address2: string
      city: string
      provinceCode: string
      countryCodeV2: string
      zip: string
    }
  }
}
