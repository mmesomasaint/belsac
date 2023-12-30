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