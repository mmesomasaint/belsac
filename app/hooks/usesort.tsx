import { useEffect, useState } from "react"
import type { MiniProduct } from '@/lib/product'
import {
  sortByDateAsc,
  sortByDateDesc,
  sortByNameAsc,
  sortByNameDesc,
  sortByPriceAsc,
  sortByPriceDesc,
} from '@/lib/sort'

export default function useSort() {
  const [products, setProducts] = useState<MiniProduct[]>([])
  const [sort, setSort] = useState('Name (asc)')

  const sortProducts = (unsortedProducts: MiniProduct[], sortType: string) => {
    switch (sortType) {
      case 'Name (asc)':
        setProducts(sortByNameAsc(unsortedProducts))
        break
      case 'Name (desc)':
        setProducts(sortByNameDesc(unsortedProducts))
        break
      case 'Date (asc)':
        setProducts(sortByDateAsc(unsortedProducts))
        break
      case 'Date (desc)':
        setProducts(sortByDateDesc(unsortedProducts))
        break
      case 'Price (asc)':
        setProducts(sortByPriceAsc(unsortedProducts))
        break
      case 'Price (desc)':
        setProducts(sortByPriceDesc(unsortedProducts))
        break
      default:
        setProducts(sortByNameAsc(unsortedProducts))
        break
    }
  }

  useEffect(() => {
    sortProducts(products, sort)
  }, [sort])

  return { products, sort, setSort, sortProducts }
}