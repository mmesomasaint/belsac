import { shopifyFetch } from '@/lib/fetch'
import { NextRequest } from 'next/server'
import {
  CREATE_CART,
  ADD_ITEMS_TO_CART,
  RETRIEVE_MINI_CART,
  RETRIEVE_CART,
} from '../query'
import {
  generateCartLinesInput,
  cleanMiniCartResult,
  generateCreateCartInput,
  cleanFullCartResult,
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

// Get cart both full & mini
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const cartId = searchParams.get('cartId')
  const type = searchParams.get('type')

  const { status, body } = await shopifyFetch({
    query: type ? RETRIEVE_CART : RETRIEVE_MINI_CART,
    variables: { cartId },
  })

  if (status === 200) {
    return Response.json({
      status: 200,
      body: type
        ? cleanFullCartResult(body.data?.cart)
        : cleanMiniCartResult(body.data?.cart),
    })
  } else {
    return Response.json({ status: 500, message: 'Error fetching data' })
  }
}
