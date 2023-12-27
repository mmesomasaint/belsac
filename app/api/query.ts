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
query SearchProducts($query: String!, $first: Int) {
  search(query: $query, first: $first, types: PRODUCT) {
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
          collections(first: 10) {
            nodes {
              handle
              title
            }
          }
        }
      }
    }
    pageInfo {
      hasNextPage
    }
  }
}
`