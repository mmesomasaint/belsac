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

interface Line {
  id: string
  merchandiseId: string
  quantity: number
  attributes: {
    key: string
    value: string
  }[]
}

export default function useCart() {
  const [loading, setLoading] = useState<boolean>(true)
  const [cartId, setCartId] = useState<string | null>(
    cookies.get('cart_id') ?? null
  )
  const [cartLines, setCartLines] = useState<Line[]>([])

  const updateCart = (newMerchandise: Merchandise) => {
    const idx = cartLines.findIndex(
      (line: Line) => line.merchandiseId === newMerchandise.id
    )

    if (idx === -1) {
      if (cartId && cartId !== 'undefined') loadCart('PUT', newMerchandise)
      else loadCart('POST', newMerchandise)
    }
  }

  const loadCart = (action: 'POST' | 'PUT', merch?: Merchandise) => {
    setLoading(true)

    fetch(`/api/cart?cart_id=${cartId}`, {
      method: action,
      body: JSON.stringify(merch),
    })
      .then((res) => res.json())
      .then((data) => {
        setCartLines(data.body.lines)
        setCartId(data.body.id)
      })
      .finally(() => setLoading(false))
  }

  return { loading, cartLines, updateCart }
}
