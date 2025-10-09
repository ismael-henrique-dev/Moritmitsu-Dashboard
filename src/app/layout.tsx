import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Moritmitsu Dashboard',
    default: 'Moritmitsu Dashboard',
  },
  description: '',
  // metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-br'>
      <body className={`${poppins.variable} antialiased`}>
        <Toaster />
        {children}
      </body>
    </html>
  )
}
