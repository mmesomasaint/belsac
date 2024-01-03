import { shopifyFetch } from '@/lib/fetch'
import { NextRequest } from 'next/server'
import { UPDATE_CUSTOMER_INFO } from '../../query'
import { cleanCustomerInfoResult, generateBuyerId } from '../../utils'

export async function POST(Request: NextRequest) {
  const searchParams = Request.nextUrl.searchParams
  const cartId = searchParams.get('cartId')
  const { customerInfo } = await Request.json()

  const { status, body } = await shopifyFetch({
    query: UPDATE_CUSTOMER_INFO,
    variables: { cartId, buyerIdentity: generateBuyerId(customerInfo) },
  })

  if (status === 200) {
    const cart = cleanCustomerInfoResult(
      body.data?.cartBuyerIdentityUpdate?.cart
    )
    return Response.json({ status: 200, body: cart })
  } else {
    return Response.json({ status: 500, message: 'Error receiving data' })
  }
}
