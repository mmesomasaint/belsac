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
  const isFaded = `${faded ? 'text-black/90' : 'text-black'}`
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
    <Link
      href={href}
      className='text-black/90 hover:underline hover:underline-offse line-clamp-2'
    >
      <Text size={size} copy>
        {children}
      </Text>
    </Link>
  )
}

export function Button({
  outline,
  children,
  onClick,
}: {
  outline?: boolean
  children: React.ReactNode
  onClick: () => void
}) {
  const outlineStyles = `${outline ? 'bg-transparent' : 'bg-black/90'}`

  return (
    <button
      className={`py-5 px-10 shadow-md border border-black/90 ${outlineStyles}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
