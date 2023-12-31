import { shopifyFetch } from '@/lib/fetch'
import { NextRequest } from 'next/server'
import { CREATE_CART, ADD_ITEMS_TO_CART } from '../query'
import {
  generateCartLinesInput,
  cleanMiniCartResult,
  generateCreateCartInput,
} from '../utils'

// Create cart
export async function POST(Request: NextRequest) {
  const { lines } = await Request.json()
  const { input } = generateCreateCartInput(lines)

  const { status, body } = await shopifyFetch({
    query: CREATE_CART,
    variables: { input },
  })

  if (status === 200) {
    console.log("Body: ", body)
    const cart = cleanMiniCartResult(body.data?.cartCreate?.cart)
    return Response.json({ status: 200, body: cart })
  } else {
    return Response.json({ status: 500, message: 'Error receiving data' })
  }
}

// Update cart with lines
export async function PUT(Request: NextRequest) {
  const searchParams = Request.nextUrl.searchParams
  const cartId = searchParams.get('cartId')
  const { lines } = await Request.json()

  const variables = { cartId, lines: generateCartLinesInput(lines) }

  const { status, body } = await shopifyFetch({
    query: ADD_ITEMS_TO_CART,
    variables,
  })

  if (status === 200) {
    const cart = cleanMiniCartResult(body.data?.cartLinesAdd?.cart)
    return Response.json({ status: 200, body: cart })
  } else {
    return Response.json({ status: 500, message: 'Error receiving data' })
  }
}
