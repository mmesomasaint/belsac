import { RETRIEVE_ALL_PRODUCTS } from '@/app/api/query'
import { MiniProductQueryResult } from '@/app/api/types'
import { cleanMiniProduct } from '@/app/api/utils'
import { shopifyFetch } from '@/lib/fetch'
import { NextRequest } from 'next/server'

const LIMIT = 24

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

    const cleanedResults = results.map(
      ({ node }: { node: MiniProductQueryResult }) => cleanMiniProduct(node)
    )

    return Response.json({
      status,
      body: {
        results: cleanedResults,
        pageInfo: { ...pageInfo, rcursor: results.cursor },
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
    query: RETRIEVE_ALL_PRODUCTS,
    variables,
  })

  if (status === 200) {
    const results = body.data?.products.edges
    const pageInfo = body.data?.products.pageInfo

    const cleanedResults = results.map(
      ({ node }: { node: MiniProductQueryResult }) => cleanMiniProduct(node)
    )

    return Response.json({
      status,
      body: { results: cleanedResults, pageInfo },
    })
  } else
    return Response.json({ status: 500, message: 'Error receiving data..' })
}
