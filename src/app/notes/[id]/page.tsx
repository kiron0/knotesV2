import LogoImg from '@/assets/notes.png';
import CopyNote from '@/utils/CopyNote';
import DownloadNote from '@/utils/DownloadNote';
import { NotesApi } from "@/utils/notes";
import type { Metadata, ResolvingMetadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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
                    <div className="lg:container px-3 mx-auto py-8">
                              <div className="text-2xl md:text-4xl lg:text-5xl select-none font-bold mb-4 text-center flex md:justify-center items-center gap-1">
                                        <Link href='/' className="flex items-center gap-1"><Image src={LogoImg} className='w-10 md:w-12' alt="" />KNotes</Link>
                              </div>

                              <div className='flex justify-center items-center pt-5'>
                                        <p className="text-xs md:text-sm glass uppercase cursor-default no-animation font-semibold bg-gradient-to-bl md:bg-gradient-to-tl from-[#cf9aff] to-[#95c0ff] text-white py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline text-center">
                                                  Thanks for using KNotes! <br />
                                                  & <span className='font-bold'>Thanks for sharing this with your friends!</span>
                                        </p>
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
                                        <div className="name border rounded-xl rounded-br-none relative mt-8 cursor-not-allowed">
                                                  <div className="name-title absolute -top-4 ml-3 bg-base-100 border rounded-lg p-1">
                                                            <h3 className="text-xs font-poppins select-none">Description</h3>
                                                  </div>
                                                  <p className="focus:outline-none pt-2 w-full bg-transparent mt-3 h-[25rem] select-none overflow-y-auto mb-4 px-4">
                                                            {note?.description}
                                                  </p>
                                        </div>
                                        <div className='flex justify-end items-center gap-1 mt-2'>
                                                  <span className='sm:tooltip' data-tip="Copy Note">
                                                            <CopyNote note={note} />
                                                  </span>
                                                  <span className='sm:tooltip' data-tip="Download Note">
                                                            <DownloadNote note={note} />
                                                  </span>
                                        </div>
                              </div>
                    </div>
          )
}
