import { SEARCH_PRODUCTS } from '@/app/api/query'
import { MiniProductQueryResult } from '@/app/api/types'
import { cleanMiniProduct } from '@/app/api/utils'
import { shopifyFetch } from '@/lib/fetch'
import { NextRequest } from 'next/server'

const LIMIT = 4

export async function POST(Request: NextRequest) {
  const searchParams = Request.nextUrl.searchParams
  const after = searchParams.get('after')
  const before = searchParams.get('before')

  const variables = {
    first: LIMIT,
    query: searchParams.get('query'),
    after: searchParams.get('cursor')
  }

  const { status, body } = await shopifyFetch({
    query: SEARCH_PRODUCTS,
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
        pageInfo: {
          ...pageInfo,
          after: results[len - 1].cursor,
        },
      },
    })
  } else
    return Response.json({ status: 500, message: 'Error receiving data..' })
}
