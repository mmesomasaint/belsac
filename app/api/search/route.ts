import { SEARCH_PRODUCTS } from '@/app/api/query'
import { MiniProductQueryResult } from '@/app/api/types'
import { cleanMiniProduct, extractFilter } from '@/app/api/utils'
import { shopifyFetch } from '@/lib/fetch'
import { NextRequest } from 'next/server'

const LIMIT = 6

export async function POST(Request: NextRequest) {
  const searchParams = Request.nextUrl.searchParams
  const query = searchParams.get('query')
  const after = searchParams.get('cursor')

  const variables: { first: number; query: string | null; after?: string } = {
    first: LIMIT,
    query,
  }
  if (after) variables['after'] = after

  const { status, body } = await shopifyFetch({
    query: SEARCH_PRODUCTS,
    variables,
  })

  if (status === 200) {
    const results = body.data?.search.edges
    const pageInfo = body.data?.search.pageInfo
    const len = results.length
    const total = body.data?.search.totalCount
    const filter = extractFilter(body.data?.search)

    const cleanedResults = results.map(
      ({ node }: { node: MiniProductQueryResult }) => cleanMiniProduct(node)
    )

    return Response.json({
      status,
      body: {
        filter,
        results: cleanedResults,
        total,
        pageInfo: {
          ...pageInfo,
          after: results[len - 1]?.cursor,
        },
      },
    })
  } else
    return Response.json({ status: 500, message: 'Error receiving data..' })
}
