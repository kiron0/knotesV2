import NotFoundImg from '@/assets/404.png';
import getBaseURL from '@/utils/baseUrl';
import type { Metadata } from 'next';
import Image from "next/image";
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
          const BASE_URL = await getBaseURL();

          return {
                    metadataBase: new URL(BASE_URL),
                    title: '404 Not found | KNotes - a simple note sharing app',
                    description: 'Uh oh! The page you are looking for does not exist. Unfortunately, we cannot find the page you are looking for.',
                    openGraph: {
                              images: [
                                        {
                                                  url: new URL('/not-found.webp', BASE_URL),
                                                  width: 800,
                                                  height: 600,
                                                  alt: "KNotes - a simple note sharing app",
                                        },
                              ],
                    },
          }
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
