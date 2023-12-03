import Link from 'next/link'

type Size = 'xl' | 'lg' | 'md' | 'sm' | 'xs'

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
  size: Size
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
    <p className={`${isCopy} ${isFaded} ${isWhite} ${sizeStyles} font-light`}>
      {children}
    </p>
  )
}

export function TextLink({
  href,
  size,
  children,
}: {
  href: string
  size: Size
  children: string
}) {
  return (
    <Link href={href} className='hover:underline hover:underline-offset-4'>
      <Text size={size} copy>{children}</Text>
    </Link>
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
