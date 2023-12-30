import Header from '@/app/components/header'

export default async function Product({
  params,
}: {
  params: { cid: string; pid: string }
}) {
  const { cid, pid } = params
  const res = await fetch(`/api/products/product?handle=${pid}`)
  const product = await res.json()
  return (
    <div className='px-7 max-w-[120rem] mx-auto'>
      <Header />
      <div className='py-4 mt-12'>
        <div className='grid grid-cols-2 place-content-between items-stretch gap-16'>
          Main content
        </div>
      </div>
    </div>
  )
}
