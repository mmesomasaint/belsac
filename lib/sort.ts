import { MiniProduct } from './product'

/**
 * Sorts a list of products objects based on the title field,
 * in ascending alphabetical order.
 * @param products The list of products to sort.
 * @returns The sorted list of products.
 */
export function sortByNameAsc(products: MiniProduct[]) {
  return products.slice().sort((a, b) => {
    return a.title.localeCompare(b.title)
  })
}

/**
 * Sorts a list of products objects based on the title field,
 * in descending alphabetical order.
 * @param products The list of products to sort.
 * @returns The sorted list of products.
 */
export function sortByNameDesc(products: MiniProduct[]) {
  return products.slice().sort((a, b) => {
    return b.title.localeCompare(a.title)
  })
}

/**
 * Sorts a list of products objects based on the date field,
 * in ascending order.
 * @param products The list of products to sort.
 * @returns The sorted list of products.
 */
export function sortByDateAsc(products: MiniProduct[]) {
  return products.slice().sort((a, b) => {
    const aDate = new Date(a.createdAt)
    const bDate = new Date(b.createdAt)
    return aDate.getMilliseconds() - bDate.getMilliseconds()
  })
}

/**
 * Sorts a list of products objects based on the date field,
 * in descending order.
 * @param products The list of products to sort.
 * @returns The sorted list of products.
 */
export function sortByDateDesc(products: MiniProduct[]) {
  return products.slice().sort((a, b) => {
    const aDate = new Date(a.createdAt)
    const bDate = new Date(b.createdAt)
    return bDate.getMilliseconds() - aDate.getMilliseconds()
  })
}

/**
 * Sorts a list of products objects based on the price field,
 * in ascending order.
 * @param products The list of products to sort.
 * @returns The sorted list of products.
 */
export function sortByPriceAsc(products: MiniProduct[]) {
  return products.slice().sort((a, b) => {
    return a.price - b.price
  })
}

/**
 * Sorts a list of products objects based on the price field,
 * in descending order.
 * @param products The list of products to sort.
 * @returns The sorted list of products.
 */
export function sortByPriceDesc(products: MiniProduct[]) {
  return products.slice().sort((a, b) => {
    return b.price - a.price
  })
}
