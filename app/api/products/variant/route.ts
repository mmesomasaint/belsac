import { shopifyFetch } from '@/lib/fetch'
import { NextRequest } from 'next/server'
import { RETRIEVE_A_PRODUCT } from '../../query'
import { cleanProduct } from '../../utils'

export async function GET(Request: NextRequest) {
  const { selectedOptions } = await Request.json()
  const searchParams = Request.nextUrl.searchParams
  const handle = searchParams.get('handle')
  const variables = {
    handle,
    selectedOptions,
  }

  const { status, body } = await shopifyFetch({
    query: RETRIEVE_A_PRODUCT,
    variables,
  })

  if (status === 200) {
    const product = cleanProduct(body.data?.product)
    return Response.json({ status: 200, body: product })
  } else {
    return Response.json({ status: 500, message: 'Error receiving data' })
  }
}
