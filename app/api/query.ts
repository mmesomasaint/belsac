export const RETRIEVE_PRODUCTS = `
query AllProducts($first: Int, $last: Int, $before: String, $after: String) {
  products(first: $first, last: $last, after: $after, before: $before) {
    edges {
      node {
        id
        title
        handle
        createdAt
        featuredImage {
          url
        }
        priceRange {
          minVariantPrice {
            amount
          }
        }
        compareAtPriceRange {
          maxVariantPrice {
            amount
          }
        }
        options {
          name
          values
        }
        collections(first: 10) {
          nodes {
            handle
            title
          }
        }
      }
      cursor
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}
`

export const SEARCH_PRODUCTS = `
query SearchProducts($query: String!, $first: Int, $after: String, $filters: [ProductFilter!]) {
  search(query: $query, first: $first, after: $after, types: PRODUCT, productFilters: $filters) {
    totalCount
    edges {
      node {
        ... on Product {
          id
          title
          handle
          featuredImage {
            url
          }
          priceRange {
            minVariantPrice {
              amount
            }
          }
          compareAtPriceRange {
            maxVariantPrice {
              amount
            }
          }
          options {
            name
            values
          }
          collections(first: 1) {
            nodes {
              handle
              title
            }
          }
        }
      }
      cursor
    }
    pageInfo {
      hasNextPage
    }
  }
}
`

export const RETRIEVE_A_PRODUCT = `
query Product($handle: String!) {
  product (handle: $handle){
    id
    handle
    title
    descriptionHtml
    description
    images (first: 10) {
      nodes {
        url
        width
        height
        altText
      }
    }
    options {
      name
      values
    }
    priceRange {
      minVariantPrice {
        amount
      }
    }
    compareAtPriceRange {
      maxVariantPrice {
        amount
      }
    }
  }
}
`

export const GET_VARIANT_BY_SELECTED_OPTIONS = `
query VariantByOptions($handle:String!, $selectedOptions: [SelectedOptionInput!]!) {
  product (handle: $handle) {
    handle
    variantBySelectedOptions (selectedOptions: $selectedOptions) {
      id
      sku
      price {
        amount
      }
      compareAtPrice {
        amount
      }
      quantityAvailable
    }
  }
}
`

export const CREATE_CART = `
mutation ($input: CartInput) {
  cartCreate(input: $input) {
    cart {
      id
      lines(first: 10) {
        nodes {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
            }
          }
          attributes {
            key
            value
          }
        }
      }
    }
  }
}
`

export const ADD_ITEMS_TO_CART = `
mutation ($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(
    cartId: $cartId
    lines: $lines
  ) {
    cart {
      id
      lines(first: 10) {
        nodes {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
            }
          }
          attributes {
            key
            value
          }
        }
      }
    }
  }
}
`

export const RETRIEVE_MINI_CART = `
query ($cartId: ID!) {
  cart(id: $cartId) {
    id
    lines(first: 10) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
          }
        }
        attributes {
          key
          value
        }
      }
    }
  }
}
`
