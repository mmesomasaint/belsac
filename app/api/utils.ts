import {MiniProductQueryResult} from './types'

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
    colors,
    src: url,
    price: parseInt(minVariantPrice.amount),
    discount: parseInt(maxVariantPrice.amount),
    collectionHandle: collectionHandles[0],
  }
}
