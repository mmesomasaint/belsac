export function Text({
  faded,
  copy,
  size,
  children,
}: {
  faded?: boolean
  copy?: boolean
  size: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  children: string
}) {
  const sizePair = { xl: '4xl', lg: '3xl', md: '2xl', sm: 'xl', xs: 'lg' }
  const sizeStyle = `text-${sizePair[size]} font-light`
  const isCopy = `${copy ? 'leading-snug' : 'leading-none'}`
  const isFaded = `${faded ? 'text-black/65' : 'text-black'}`

  return <p className={`${sizeStyle} ${isCopy} ${isFaded}`}>{children}</p>
}

export function Button({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button className='bg-black py-5 px-10 rounded-full' onClick={onClick}>
      {children}
    </button>
  )
}
