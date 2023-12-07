
export const RETRIEVE_ALL_PRODUCTS = `
query AllProducts($first: Int!) {
  products(first: $first) {
    edges {
      node {
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
    }
  }
}
`

export const RETRIEVE_PRODUCTS_AFTER_CURSOR = `
query AllProducts($first: Int!, $cursor: String!) {
  products(first: $first, after: $cursor) {
    edges {
      node {
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
        collections(first: 10) {
          nodes {
            handle
            title
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      cursor
    }
  }
}
`
