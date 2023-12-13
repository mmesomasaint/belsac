
export const RETRIEVE_ALL_PRODUCTS = `
query AllProducts($first: Int!) {
  products(first: $first) {
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
    }
  }
}
`

export const GET_SEARCH_FILTER_KEYS = `
query GetFilters($first: Int) {
  products(first: $first) {
    nodes {
      id
      createdAt
      priceRange {
        minVariantPrice {
          amount
        }
      }
      options {
        name
        values
      }
      collections (first: $first) {
        nodes {
          title
        }
      }
    }
  }
}
`