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
    title: "KNotes - a simple note sharing app",
    description: "A simple note sharing app, where you can share notes with others.",
    openGraph: {
      images: [
        {
          url: new URL('/notes.png', BASE_URL),
          width: 800,
          height: 600,
          alt: "KNotes - a simple note sharing app",
        },
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
