import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CartProvider } from './hooks/usecart'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Belsac',
  description: 'One stop for top quality bags and accessories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
