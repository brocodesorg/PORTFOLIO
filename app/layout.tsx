import type { Metadata, Viewport } from 'next'
import { Archivo, Space_Grotesk } from 'next/font/google'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  weight: ['300', '400', '500', '600', '700', '900'],
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#080C14',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: 'BROCODES — Creative Engineering & 3D Web Studio',
  description:
    'Award-winning creative engineering studio building category-defining 3D web applications, high-performance web systems, and custom AI solutions.',
  keywords: [
    'BROCODES',
    'creative developer',
    '3D portfolio',
    'WebGL',
    'Three.js',
    'Next.js',
    'GSAP animations',
    'creative agency',
  ],
  authors: [{ name: 'BROCODES Team', url: 'https://brocodes.space/' }],
  creator: 'BROCODES',
  openGraph: {
    title: 'BROCODES — Creative Engineering & 3D Web Studio',
    description: 'Code. Create. Dominate. Award-winning 3D web applications and AI systems.',
    url: 'https://brocodes.space/',
    siteName: 'BROCODES',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BROCODES — Creative Engineering & 3D Web Studio',
    description: 'Code. Create. Dominate. Award-winning 3D web applications and AI systems.',
    creator: '@brocodesorg',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${archivo.variable} ${spaceGrotesk.variable} font-body bg-[#080C14] text-white antialiased selection:bg-primary selection:text-white`}
      >
        {children}
      </body>
    </html>
  )
}
