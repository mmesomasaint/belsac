import { MiniProduct } from './product'

/**
 * Sorts a list of products objects based on the title field,
 * in ascending alphabetical order.
 * @param products The list of products to sort.
 * @returns The sorted list of products.
 */
function sortByNameAsc(products: MiniProduct[]) {
  return products.slice().sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
}

/**
 * Sorts a list of products objects based on the title field,
 * in descending alphabetical order.
 * @param products The list of products to sort.
 * @returns The sorted list of products.
 */
function sortByNameDesc(products: MiniProduct[]) {
  return products.slice().sort((a, b) => {
    return b.name.localeCompare(a.name)
  })
}

/**
 * Sorts a list of products objects based on the date field,
 * in ascending order.
 * @param products The list of products to sort.
 * @returns The sorted list of products.
 */
function sortByDateAsc(products: MiniProduct[]) {
  return products.slice().sort((a, b) => {
    return a.date - b.date
  })
}

/**
 * Sorts a list of products objects based on the date field,
 * in descending order.
 * @param products The list of products to sort.
 * @returns The sorted list of products.
 */
function sortByDateDesc(products: MiniProduct[]) {
  return products.slice().sort((a, b) => {
    return b.date - a.date
  })
}

/**
 * Sorts a list of products objects based on the price field,
 * in ascending order.
 * @param products The list of products to sort.
 * @returns The sorted list of products.
 */
function sortByPriceAsc(products: MiniProduct[]) {
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
function sortByPriceDesc(products: MiniProduct[]) {
  return products.slice().sort((a, b) => {
    return b.price - a.price
  })
}
