import cookies from 'js-cookie'
import { useState } from 'react'

interface Merchandise {
  quantity: number
  id: string
  attributes: {
    key: string
    value: string
  }[]
}

export default function useCart() {
  const [adding, setAdding] = useState<boolean>(false)
  const [cartId, setCartId] = useState<string | null>(
    cookies.get('cart_id') ?? null
  )

  const updateCart = (newMerchandise: Merchandise) => {
    if (cartId && cartId !== 'undefined') loadCart('PUT', newMerchandise)
    else loadCart('POST', newMerchandise)
  }

  const loadCart = (action: 'POST' | 'PUT', merch?: Merchandise) => {
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
      })
      .finally(() => setAdding(false))
  }

  return { adding, updateCart }
}
