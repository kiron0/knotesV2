import LogoImg from '@/assets/notes.png';
import CopyNote from '@/utils/CopyNote';
import DownloadNote from '@/utils/DownloadNote';
import { NotesApi } from "@/utils/notes";
import type { Metadata, ResolvingMetadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GoHeartFill } from "react-icons/go";
import { RiHomeHeartLine } from 'react-icons/ri';

type Props = {
          params: { id: string }
          searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
          { params, searchParams }: Props,
          parent: ResolvingMetadata
): Promise<Metadata> {
          const { id } = params

          const { data } = await NotesApi.getNoteById(id)

          const note = data;

          if (!note) {
                    return notFound()
          }

          return {
                    title: `${note.title} - KNotes` || 'Untitled Note - KNotes',
                    description: note.description || 'No description',
          }
}

export default async function SingleNote({ params, searchParams }: Props) {
          const { id } = params;

          const { data } = await NotesApi.getNoteById(id);

          const note = data;

          return (
                    <div className="relative h-screen">
                              <div className="lg:container px-3 mx-auto py-8">
                                        <div className="text-2xl md:text-4xl lg:text-5xl select-none font-bold mb-4 text-center flex md:justify-center items-center gap-1">
                                                  <Link href='/' className="flex items-center gap-1"><Image src={LogoImg} className='w-10 md:w-12' alt="" />KNotes</Link>
                                        </div>

                                        <div className="mb-4">
                                                  <div className="name border rounded-xl relative mt-10 cursor-not-allowed">
                                                            <div className="name-title absolute -top-4 ml-3 bg-base-100 border rounded-lg p-1">
                                                                      <h3 className="text-xs font-poppins select-none">Title</h3>
                                                            </div>
                                                            <p className="focus:outline-none pl-4 pt-2 w-full bg-transparent mt-3 h-[3rem] select-none overflow-y-auto mb-4 md:mb-0 px-4">
                                                                      {note?.title}
                                                            </p>
                                                  </div>
                                                  <div className="name border rounded-xl relative mt-8 cursor-not-allowed">
                                                            <div className="name-title absolute -top-4 ml-3 bg-base-100 border rounded-lg p-1">
                                                                      <h3 className="text-xs font-poppins select-none">Description</h3>
                                                            </div>
                                                            <p className="focus:outline-none pt-2 w-full bg-transparent mt-3 h-[20rem] select-none overflow-y-auto mb-4 px-4">
                                                                      {note?.description}
                                                            </p>
                                                  </div>
                                        </div>

                                        <div className='flex justify-center items-center pt-5'>
                                                  <p className="text-xs md:text-sm glass uppercase cursor-default no-animation font-semibold py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline text-center select-none flex items-center gap-1">
                                                            Thanks for using <GoHeartFill /> <span className='font-bold'>KNotes!</span>
                                                  </p>
                                        </div>
                              </div>
                              <div className="absolute bottom-5 md:bottom-8 left-1/2 transform -translate-x-1/2">
                                        <div className="flex justify-center items-center gap-3 glass px-2 py-1 rounded-xl">
                                                  <span className='sm:tooltip' data-tip="Copy Note">
                                                            <CopyNote note={note} />
                                                  </span>
                                                  <span className='sm:tooltip' data-tip="Home">
                                                            <Link href='/'>
                                                                      <button className="border-r py-2 px-3 font-semibold">
                                                                                <RiHomeHeartLine size={20} />
                                                                      </button>
                                                            </Link>
                                                  </span>
                                                  <span className='sm:tooltip' data-tip="Download Note">
                                                            <DownloadNote note={note} />
                                                  </span>
                                        </div>
                              </div>
                    </div>
          )
}
