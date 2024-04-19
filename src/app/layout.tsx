import { description, title } from '@/constant'
import getBaseURL from '@/utils/baseUrl'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import NextTopLoader from "nextjs-toploader"
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const nunito = Nunito({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const BASE_URL = await getBaseURL();

  return {
    metadataBase: new URL(BASE_URL),
    title: title,
    description: description,
    openGraph: {
      images: [
        {
          url: new URL('/home.png', BASE_URL),
          width: 800,
          height: 600,
          alt: title,
        },
        {
          url: new URL('/home.png', BASE_URL),
          width: 900,
          height: 800,
          alt: title,
        },
        {
          url: new URL('/home.png', BASE_URL),
          width: 1200,
          height: 900,
          alt: title,
        },
        {
          url: new URL('/home.png', BASE_URL),
          width: 1600,
          height: 1200,
          alt: title,
        },
        {
          url: new URL('/home.png', BASE_URL),
          width: 2000,
          height: 1600,
          alt: title,
        }
      ],
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={nunito.className}>
        <main>
          {children}
        </main>
        <NextTopLoader
          color="#000"
        />
        <Toaster />
      </body>
    </html>
  )
}
