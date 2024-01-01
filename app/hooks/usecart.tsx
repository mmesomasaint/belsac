'use client'

import cookies from 'js-cookie'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

interface Merchandise {
  quantity: number
  id: string
  attributes: {
    key: string
    value: string
  }[]
}

interface Line {
  id: string
  merchandiseId: string
  quantity: number
  attributes: {
    key: string
    value: string
  }[]
}

interface Cost {
  subtotalAmount: number
  totalAmount: number
  totalTaxAmount: number
}

const DEFAULT_COST = {subtotalAmount: 0, totalAmount: 0, totalTaxAmount: 0}

interface CartContextType {
  cartId: string | null
  updateCart: (newMerchandise: Merchandise) => void
  deleteLine: (line: Line) => void
  adding: boolean
  cartSize: number
  cartPrice: Cost
}

const CartContext = createContext<CartContextType>({
  cartId: null,
  updateCart: () => {},
  deleteLine: () => {},
  adding: false,
  cartSize: 0,
  cartPrice: DEFAULT_COST
})

export const useCart = () => useContext(CartContext)

export function CartProvider({ children }: { children: ReactNode }) {
  const [adding, setAdding] = useState<boolean>(false)
  const [cartPrice, setCartPrice] = useState<Cost>(DEFAULT_COST)
  const [cartLines, setCartLines] = useState<Line[]>([])
  const [cartId, setCartId] = useState<string | null>(
    cookies.get('cart_id') ?? null
  )

  const updateCart = (newMerchandise: Merchandise) => {
    if (cartId && cartId !== 'undefined') loadCart('PUT', newMerchandise)
    else loadCart('POST', newMerchandise)
  }

  const deleteLine = (line: Line) => loadCart('DELETE', line)

  const loadCart = (
    action: 'POST' | 'PUT' | 'GET' | 'DELETE',
    merch?: Merchandise
  ) => {
    setAdding(true)

    const body = action === 'GET' ? null : JSON.stringify({ lines: [merch] })

    fetch(`/api/cart?cartId=${cartId}`, {
      method: action,
      body,
    })
      .then((res) => res.json())
      .then((data) => {
        const newCartId = data?.body.id

        // Only store cartId if it's a new cart.
        !cartId && cookies.set('cart_id', newCartId, { expires: 7 })

        setCartId(newCartId)
        setCartLines(data?.body.cartLines)
        setCartPrice(data?.body.cost)
      })
      .finally(() => setAdding(false))
  }

  useEffect(() => {
    cartId && loadCart('GET')
  }, [])

  return (
    <CartContext.Provider
      value={{
        cartId,
        updateCart,
        deleteLine,
        adding,
        cartSize: cartLines.length,
        cartPrice
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default useCart
