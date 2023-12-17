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