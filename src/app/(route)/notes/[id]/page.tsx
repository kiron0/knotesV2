import { NotesApi } from "@/server/action/notesApi";
import type { Metadata } from 'next';
import { notFound } from "next/navigation";
import SingleNote from './single-note';

type NoteProps = {
          params: { id: string }
}

export async function generateMetadata({ params }: NoteProps): Promise<Metadata> {
          const { id } = params;
          const { data: note } = await NotesApi.getNoteById(id);

          if (!note) { };

          return {
                    title: `${note.title} - KNotes` || 'Untitled Note - KNotes',
                    description: note.description || 'No description',
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
