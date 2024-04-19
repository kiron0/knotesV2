import { description, shortTitle } from "@/constant";
import { NotesApi } from "@/server/action/notesApi";
import getBaseURL from "@/utils/baseUrl";
import type { Metadata } from 'next';
import { notFound } from "next/navigation";
import SingleNote from './single-note';

type NoteProps = {
          params: { id: string }
}

export async function generateMetadata({ params }: NoteProps): Promise<Metadata> {
          const { id } = params;
          const { data: note } = await NotesApi.getNoteById(id);

          const BASE_URL = await getBaseURL();

          if (!note) { };

          return {
                    metadataBase: new URL(BASE_URL),
                    title: `${note.title} - ${shortTitle}` || `Untitled Note - ${shortTitle}`,
                    description: description,
                    openGraph: {
                              images: [
                                        {
                                                  url: new URL('/note.png', BASE_URL),
                                                  width: 800,
                                                  height: 600,
                                                  alt: note.title || 'Untitled Note',
                                        },
                                        {
                                                  url: new URL('/note.png', BASE_URL),
                                                  width: 900,
                                                  height: 800,
                                                  alt: note.title || 'Untitled Note',
                                        },
                                        {
                                                  url: new URL('/note.png', BASE_URL),
                                                  width: 1200,
                                                  height: 900,
                                                  alt: note.title || 'Untitled Note',
                                        },
                                        {
                                                  url: new URL('/note.png', BASE_URL),
                                                  width: 1600,
                                                  height: 1200,
                                                  alt: note.title || 'Untitled Note',
                                        },
                                        {
                                                  url: new URL('/note.png', BASE_URL),
                                                  width: 2000,
                                                  height: 1600,
                                                  alt: note.title || 'Untitled Note',
                                        }
                              ],
                    },
          }
}

export default async function Page({ params }: NoteProps) {
          const { id } = params;
          const { data } = await NotesApi.getNoteById(id);

          if (!data) notFound();

          return (
                    <>
                              <SingleNote note={data} />
                    </>
          )
}
