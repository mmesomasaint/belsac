import { Filter } from '@/lib/filter'
import { MiniProductQueryResult, SearchProductsQueryResult } from './types'

/**
 * Cleans up the query result of mini product
 * @param queryResult The result of fetching the mini product query.
 * @returns A cleaner version of mini product that can be used by components
 */
export function cleanMiniProduct(queryResult: MiniProductQueryResult) {
  const {
    id,
    title,
    handle,
    featuredImage,
    priceRange,
    compareAtPriceRange,
    options,
    collections,
    createdAt,
  } = queryResult
  const { url } = featuredImage
  const { minVariantPrice } = priceRange
  const { maxVariantPrice } = compareAtPriceRange
  const collectionHandles = collections.nodes.map((node) => node.handle)

  let colors = Array()
  options
    .filter((option) => option.name === 'Color')
    .forEach((option) => colors.push(...option.values))

  return {
    id,
    title,
    handle,
    createdAt,
    featuredImage: url,
    price: parseInt(minVariantPrice.amount),
    compareAtPrice: parseInt(maxVariantPrice.amount),
    collectionHandle: collectionHandles[0],
  }
}

/**
 * Extracts the filter from the query result
 * @param queryResult The result of fetching the search products query.
 * @returns A Filter containing keys partaining to query result.
 */
export function extractFilter(queryResult: SearchProductsQueryResult): Filter {
  const { edges } = queryResult
  const brands = Array()
  let maxPrice = 0
  let optionValues = {}

  edges.forEach(({ node }) => {
    const { options, collections, priceRange } = node

    // Extract collections as brands
    const collectionTitles = collections.nodes.map((node) => node.title)
    brands.push(collectionTitles[0])

    // Extract prices
    const { minVariantPrice } = priceRange
    maxPrice = Math.max(maxPrice, parseInt(minVariantPrice.amount))

    // Extract other options
    // 1. Extract all the names with no duplicates.
    const optionNames = Array.from(
      new Set(options.map((option) => option.name))
    )
    // 2. Extract all the values attached to the extracted names and place them in an object with boolean false value
    // e.g. {'Color': {'blue': false, 'orange': false}, Size: {'small': false, 'medium': false}}
    optionValues = Object.fromEntries(
      optionNames.map((name) => [
        name,
        Object.fromEntries(
          options
            .filter((option) => option.name === name)[0]
            .values.map((value) => [value, false])
        ),
      ])
    )
  })

  return {
    price: {
      min: 0,
      max: maxPrice,
      highest: maxPrice,
    },
    brands: Object.fromEntries(brands.map((item) => [item, false])),
    ...optionValues,
  }
}

export function parseFilter(filter: Filter) {
  // Extract price
  const price = { price: { min: filter.price.min, max: filter.price.max } }

  // Extract other variants
  // [{variantOption: {name: 'color', value: 'natural'}}]
  const otherVariants = Object.keys(filter)
    .filter((key) => key !== 'price')
    .map((key) =>
      Object.fromEntries(
        Object.keys(filter[key]).map((subKey) => [
          'variantOptions',
          [
            ['name', key],
            ['value', subKey],
          ],
        ])
      )
    )

  return [price, ...otherVariants]
}
