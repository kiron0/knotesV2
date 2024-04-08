import type { Metadata } from 'next'
import Notes from './notes'

export const metadata: Metadata = {
          title: 'Create Note - KNotes',
          description: 'A simple note sharing app, where you can share notes with others.',
}

export default function Page() {
          return (
                    <>
                              <Notes />
                    </>
          )
}