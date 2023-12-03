export function Text({
  white,
  faded,
  copy,
  size,
  children,
}: {
  white?: boolean
  faded?: boolean
  copy?: boolean
  size: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  children: string
}) {
  const sizeStyles = `${size === 'xl' && 'text-4xl'} ${
    size === 'lg' && 'text-3xl'
  } ${size === 'md' && 'text-2xl'} ${size === 'sm' && 'text-xl'} ${
    size === 'xs' && 'text-lg'
  }`

  const isCopy = `${copy ? 'leading-snug' : 'leading-none'}`
  const isFaded = `${faded ? 'text-black/65' : 'text-black'}`
  const isWhite = `${white ? 'text-white' : 'text-black'}`

  return (
    <p className={`${isCopy} ${isFaded} ${sizeStyles} font-light`}>
      {children}
    </p>
  )
}

export function Button({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button className='bg-black py-5 px-10 shadow-md' onClick={onClick}>
      {children}
    </button>
  )
}
