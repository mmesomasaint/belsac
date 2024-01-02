import { Filter, FilterSubKey } from '@/lib/filter'
import {
  CartLine,
  CustomerInfoQueryResult,
  FullCartQueryResult,
  GetVariantQueryResult,
  Merchandise,
  MiniCartQueryResult,
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

/**
 * Converts a query result variant into a usable object.
 * @param queryResult The version of the product based on some key options
 * @returns A version that can be used by components
 */
export function cleanProductVariant(queryResult: GetVariantQueryResult) {
  const { variantBySelectedOptions: variant } = queryResult

  return {
    id: variant.id,
    sku: variant.sku,
    price: variant.price ? Number(variant.price.amount) : null,
    discount: variant.compareAtPrice
      ? Number(variant.compareAtPrice.amount)
      : null,
    quantityAvailable: variant.quantityAvailable,
  }
}

/**
 * Generates an input object from a list of products.
 * @param lines The list of products id and quantity choosen by customer.
 * @returns An input object that is passed to query to create a cart.
 */
export function generateCreateCartInput(lines: Merchandise[]) {
  return {
    input: {
      lines: generateCartLinesInput(lines),
      buyerIdentity: {
        email: 'exampler@example.com',
        countryCode: 'NG',
        deliveryAddressPreferences: {
          deliveryAddress: {
            address1: 'No Example Street',
            address2: '8th Example Floor',
            city: 'Enugu',
            province: 'South-east',
            country: 'NG',
            zip: '41001',
          },
        },
      },
      attributes: {
        key: 'cart_attribute',
        value: 'This is a cart attribute',
      },
    },
  }
}

/**
 * Generates a list of products that can be passed as parameter to query.
 * @param lines The list of products id and quantity choosen by customer
 * @returns A list of products(merchandise) that can be passed to query
 */
export function generateCartLinesInput(lines: Merchandise[]) {
  return lines.map(({ id, quantity, attributes }) => ({
    merchandiseId: id,
    quantity,
    attributes,
  }))
}

/**
 * Converts lines query results to a cleaner format.
 * @param line List of merchandise gotten from querying for cart
 * @returns A cleaner format that can be used by components
 */
export function cleanCartLinesResult(line: CartLine) {
  const { id, quantity, merchandise, attributes } = line

  return {
    id,
    quantity,
    merchandiseId: merchandise.id,
    attributes,
  }
}

/**
 * Converts cart query result to a cleaner format.
 * @param queryResult A result gotten from querying for mini cart
 * @returns A cleaner format of cart that can be used by components
 */
export function cleanMiniCartResult(queryResult: MiniCartQueryResult) {
  const { id, lines, cost } = queryResult
  const cartLines = lines.nodes.map((node) => cleanCartLinesResult(node))

  return {
    id,
    cartLines,
    cost: {
      totalAmount: cost.totalAmount?.amount,
      subtotalAmount: cost.subtotalAmount?.amount,
      totalTaxAmount: cost.totalTaxAmount?.amount,
    },
  }
}

/**
 * Converts full cart query result to a cleaner format.
 * @param fullCartResult A result gotten from querying for full cart
 * @returns A cleaner formart of cart that can be used by components
 */
export function cleanFullCartResult(fullCartResult: FullCartQueryResult) {
  const { id, checkoutUrl, lines, attributes, buyerIdentity } = fullCartResult
  const cartLines = lines.nodes.map((node) => cleanCartLinesResult(node))

  return {
    id,
    checkoutUrl,
    cartLines,
    attributes,
    buyerIdentity: {
      email: buyerIdentity.email,
      phone: buyerIdentity.phone,
      customerId: buyerIdentity.customer?.id,
      firstName: buyerIdentity.customer?.firstName,
      lastName: buyerIdentity.customer?.lastName,
      address1: buyerIdentity.deliveryAddressPreferences?.address1,
      address2: buyerIdentity.deliveryAddressPreferences?.address2,
      city: buyerIdentity.deliveryAddressPreferences?.city,
      zip: buyerIdentity.deliveryAddressPreferences?.zip,
      country: buyerIdentity.deliveryAddressPreferences?.country,
    },
  }
}

/**
 * Generates a list of cart line ids that can be passed as parameter to query.
 * @param lines The list of products id and quantity choosen by customer
 * @returns A list of cart line ids that can be passed to query
 */
export function generateCartLineIds(lines: Merchandise[]) {
  return lines.map(({ id }) => id)
}

export function cleanCustomerInfoResult(result: CustomerInfoQueryResult) {
  const { id, buyerIdentity } = result
  const {
    email,
    phone,
    customer: { firstName, lastName },
    deliveryAddressPreferences: { address1, address2, city, zip, country },
  } = buyerIdentity

  return {
    id,
    firstName,
    lastName,
    email,
    phone,
    address1,
    address2,
    city,
    country,
  }
}
