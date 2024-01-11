import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KNotes - a simple note sharing app',
  description: 'A simple note sharing app, where you can share notes with others.',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={nunito.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
