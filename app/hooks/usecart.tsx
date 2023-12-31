'use client'

import cookies from 'js-cookie'
import { ReactNode, createContext, useContext, useState } from 'react'

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

interface CartContextType {
  updateCart: (newMerchandise: Merchandise) => void
  adding: boolean
  cartSize: number
}

const CartContext = createContext<CartContextType>({
  updateCart: () => {},
  adding: false,
  cartSize: 0,
})

export const useCart = () => useContext(CartContext)

export function CartProvider({ children }: { children: ReactNode }) {
  const [adding, setAdding] = useState<boolean>(false)
  const [cartLines, setCartLines] = useState<Line[]>([])
  const [cartId, setCartId] = useState<string | null>(
    cookies.get('cart_id') ?? null
  )

  const updateCart = (newMerchandise: Merchandise) => {
    if (cartId && cartId !== 'undefined') loadCart('PUT', newMerchandise)
    else loadCart('POST', newMerchandise)
  }

  const loadCart = (action: 'POST' | 'PUT' | 'GET', merch?: Merchandise) => {
    setAdding(true)

    fetch(`/api/cart?cartId=${cartId}`, {
      method: action,
      body: JSON.stringify({ lines: [merch] }),
    })
      .then((res) => res.json())
      .then((data) => {
        const newCartId = data?.body.id

        // Only store cartId if it's a new cart.
        !cartId && cookies.set('cart_id', newCartId, { expires: 7 })

        setCartId(newCartId)
        setCartLines(data?.body.lines)
      })
      .finally(() => setAdding(false))
  }

  return (
    <CartContext.Provider
      value={{ updateCart, adding, cartSize: cartLines.length }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default useCart
