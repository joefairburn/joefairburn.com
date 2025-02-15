import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@fontsource-variable/inter'
import './globals.css'
import { Cursor } from '../components/Cursor'
import { Nav } from '../components/Nav'
import { CursorProvider } from '../store/cursorContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Joe Fairburn',
  description: 'Personal website of Joe Fairburn'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
      </head>
      <body
        className={`${inter.className} bg-[#191919] text-white font-sans p-8 min-h-screen`}
      >
        <CursorProvider>
          <Nav />
          <main>{children}</main>
          <Cursor />

          <svg className='pointer-events-none fixed inset-0 top-0 bottom-0 right-0 left-0 -z-50 h-full w-full overflow-hidden opacity-[0.075]'>
            <filter id='fractalNoise'>
              <feTurbulence
                type='fractalNoise'
                baseFrequency='.55'
                numOctaves='1'
                stitchTiles='stitch'
              />
            </filter>
            <rect width='100%' height='100%' filter='url(#fractalNoise)' />
          </svg>
        </CursorProvider>
      </body>
    </html>
  )
}
