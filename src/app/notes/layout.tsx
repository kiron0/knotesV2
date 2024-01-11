import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
          title: 'Create Notes - KNotes',
          description: 'Create notes and share them with others. KNotes is a simple note sharing app.',
}

export default function NotesLayout({
          children,
}: {
          children: ReactNode
}) {
          return (
                    <div>
                              {children}
                    </div>
          )
}
