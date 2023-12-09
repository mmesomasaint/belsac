import { RETRIEVE_ALL_PRODUCTS, RETRIEVE_PRODUCTS_AFTER_CURSOR } from '@/app/api/query'
import { MiniProductQueryResult } from '@/app/api/types'
import { cleanMiniProduct } from '@/app/api/utils'
import { shopifyFetch } from '@/lib/fetch'
import { NextRequest } from 'next/server'

const LIMIT = 5

export async function GET() {
  const variables = {
    first: LIMIT,
  }

  const { status, body } = await shopifyFetch({
    query: RETRIEVE_ALL_PRODUCTS,
    variables,
  })

  if (status === 200) {
    const results = body.data?.products.edges
    const pageInfo = body.data?.products.pageInfo
    const len = results.length

    const cleanedResults = results.map(
      ({ node }: { node: MiniProductQueryResult }) => cleanMiniProduct(node)
    )

    return Response.json({
      status,
      body: {
        results: cleanedResults,
        pageInfo: { ...pageInfo, cursor: results[len - 1].cursor },
      },
    })
  } else
    return Response.json({ status: 500, message: 'Error receiving data..' })
}

export async function POST(Request: NextRequest) {
  const searchParams = Request.nextUrl.searchParams
  const cursor = searchParams.get('cursor')

  const variables = {
    first: LIMIT,
    cursor,
  }

  const { status, body } = await shopifyFetch({
    query: RETRIEVE_PRODUCTS_AFTER_CURSOR,
    variables,
  })

  if (status === 200) {
    const results = body.data?.products.edges
    const pageInfo = body.data?.products.pageInfo
    const len = results.length

    const cleanedResults = results.map(
      ({ node }: { node: MiniProductQueryResult }) => cleanMiniProduct(node)
    )

    return Response.json({
      status,
      body: { results: cleanedResults, 
        pageInfo: { ...pageInfo, cursor: results[len - 1].cursor } },
    })
  } else
    return Response.json({ status: 500, message: 'Error receiving data..' })
}
