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
      className='text-black/90 decoration-from-font hover:underline group-hover:underline hover:underline-offset-4 group-hover:underline-offset-4 line-clamp-2'
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
  disabled,
}: {
  outline?: boolean
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
}) {
  const outlineStyles = `${
    outline
      ? 'bg-transparent hover:bg-gray-300 disabled:border-black/30'
      : 'bg-black/90 hover:bg-black/50 disabled:bg-black/30'
  }`
  const outlineTextStyles = `${outline ? 'text-black/90' : 'text-white'}`

  return (
    <button
      type='button'
      disabled={disabled}
      className={`py-4 px-10 shadow-md border border-black/90 leading-none text-2xl font-light ${outlineStyles} ${outlineTextStyles}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export function OptionBox({
  children,
  active,
  onClick,
}: {
  children: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type='button'
      key={children}
      className={`px-4 py-2 border border-black/20 hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
        active ? 'bg-black text-white' : ''
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export function MiniBox({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      type='button'
      className='w-12 h-12 flex justify-center items-center border border-black/20 hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
      onClick={onClick}
    >
      {children}
    </button>
  )
}
