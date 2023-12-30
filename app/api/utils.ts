import { Filter, FilterSubKey } from '@/lib/filter'
import {
  MiniProductQueryResult,
  RetrieveProductQueryResult,
  SearchProductsQueryResult,
} from './types'

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
 * Filter products whose collections contain at least on of the filter collections.
 * @param result The result of fetching the search products query.
 * @param filterCollections The collections to filter by.
 * @returns The filtered products.
 */
export function filterProductByCollection(
  result: { node: MiniProductQueryResult }[],
  filterCollections: string[]
) {
  return result.reduce((acc, { node }) => {
    const {
      collections: { nodes },
    } = node
    const isPassed = nodes.some(({ title }) =>
      filterCollections.includes(title)
    )

    if (isPassed) return [...acc, cleanMiniProduct(node)]
    return acc
  }, Array())
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

/**
 * Parses the filter into a format that can be used by the query
 * @param filter The filter to be parsed.
 * @returns An array of objects that can be used by the query.
 */
export function parseFilter(filter: Filter) {
  // Parse price
  const price = {
    price: { min: filter.price.min as number, max: filter.price.max as number },
  }

  // Parse other variants
  // Required format: [{variantOption: {name: 'color', value: 'natural'}}]
  const variants = Object.keys(filter)
    .filter((key) => key !== 'price' && key !== 'brands')
    .map((key) =>
      Object.fromEntries(
        Object.keys(filter[key])
          .filter((subKey) => (filter[key] as FilterSubKey)[subKey] === true)
          .map((subKey) => [
            'variantOptions',
            Object.fromEntries([
              ['name', key],
              ['value', subKey],
            ]),
          ])
      )
    )
    .filter((obj) => Object.keys(obj).length > 0)

  return [price, ...variants]
}

/**
 * Cleans up a product returned from query.
 * @param queryResult The full product result from querying shopify for a product.
 * @returns A cleaner version of the returned product that can be used by components
 */
export function cleanProduct(queryResult: RetrieveProductQueryResult) {
  const {
    id,
    title,
    handle,
    description,
    descriptionHtml,
    images,
    options,
    priceRange,
    compareAtPriceRange,
  } = queryResult

  return {
    id,
    title,
    handle,
    description,
    descriptionHtml,
    options,
    images: images.nodes,
    price: priceRange ? Number(priceRange.minVariantPrice.amount) : null,
    discount: compareAtPriceRange
      ? Number(compareAtPriceRange.maxVariantPrice.amount)
      : null,
  }
}
