import NotFoundImg from '@/assets/404.png'
import type { Metadata } from 'next'
import Image from "next/image"
import Link from 'next/link'

export const metadata: Metadata = {
          title: 'Note not found - KNotes',
          description: 'Uh oh! The note you are looking for does not exist. Unfortunately, we cannot find the note you are looking for. Please create a new note.',
}


export default function NotFound() {
          return (
                    <div className="flex flex-col items-center justify-center h-screen">
                              <Image src={NotFoundImg} draggable={false} alt="404" className='w-48 select-none' />
                              <h1 className="text-3xl font-bold text-center">
                                        Note not found <br /> or maybe deleted
                              </h1>
                              <Link href={'/notes'} className="btn btn-sm bg-gradient-to-br md:bg-gradient-to-tl to-[#95c0ff] from-[#cf9aff] text-white font-semibold mt-3">
                                        Create Note
                              </Link>
                    </div>
          )
}
