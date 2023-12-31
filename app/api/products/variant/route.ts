import { shopifyFetch } from '@/lib/fetch'
import { NextRequest } from 'next/server'
import { GET_VARIANT_BY_SELECTED_OPTIONS } from '../../query'
import { cleanProductVariant } from '../../utils'

export async function POST(Request: NextRequest) {
  const { selectedOptions } = await Request.json()
  const searchParams = Request.nextUrl.searchParams
  const handle = searchParams.get('handle')
  const variables = {
    handle,
    selectedOptions,
  }

  const { status, body } = await shopifyFetch({
    query: GET_VARIANT_BY_SELECTED_OPTIONS,
    variables,
  })

  if (status === 200) {
    const product = cleanProductVariant(body.data?.product)
    return Response.json({ status: 200, body: product })
  } else {
    return Response.json({ status: 500, message: 'Error receiving data' })
  }
}
