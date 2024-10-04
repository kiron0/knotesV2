import { shortTitle } from "@/constant";
import { NotesApi } from "@/server/action/notesApi";
import { TNote } from "@/types";
import getBaseURL from "@/utils/baseUrl";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import SingleNote from "./single-note";

type NoteProps = {
  params: { id: string };
};

export async function generateMetadata({
  params,
}: NoteProps): Promise<Metadata> {
  const { id } = params;
  const { data } = await NotesApi.getNoteById(id);

  const note = data as TNote;

  const BASE_URL = await getBaseURL();

  if (!note) {
    return {
      metadataBase: new URL(BASE_URL),
      title: "Note not found",
      description: "Note not found",
      openGraph: {
        images: [
          {
            url: new URL("/note.png", BASE_URL),
            width: 800,
            height: 600,
            alt: "Note not found",
          },
          {
            url: new URL("/note.png", BASE_URL),
            width: 900,
            height: 800,
            alt: "Note not found",
          },
          {
            url: new URL("/note.png", BASE_URL),
            width: 1200,
            height: 900,
            alt: "Note not found",
          },
          {
            url: new URL("/note.png", BASE_URL),
            width: 1600,
            height: 1200,
            alt: "Note not found",
          },
          {
            url: new URL("/note.png", BASE_URL),
            width: 2000,
            height: 1600,
            alt: "Note not found",
          },
        ],
      },
    };
  }

  return {
    metadataBase: new URL(BASE_URL),
    title:
      `${note.title} | ${note.type ? (note.type === "text" ? "Text" : "JSON") : "Unknown"} - ${shortTitle}` ||
      `Untitled Note - ${shortTitle}`,
    openGraph: {
      images: [
        {
          url: new URL("/note.png", BASE_URL),
          width: 800,
          height: 600,
          alt: note.title || "Untitled Note",
        },
        {
          url: new URL("/note.png", BASE_URL),
          width: 900,
          height: 800,
          alt: note.title || "Untitled Note",
        },
        {
          url: new URL("/note.png", BASE_URL),
          width: 1200,
          height: 900,
          alt: note.title || "Untitled Note",
        },
        {
          url: new URL("/note.png", BASE_URL),
          width: 1600,
          height: 1200,
          alt: note.title || "Untitled Note",
        },
        {
          url: new URL("/note.png", BASE_URL),
          width: 2000,
          height: 1600,
          alt: note.title || "Untitled Note",
        },
      ],
    },
  };
}

export default async function Page({ params }: NoteProps) {
  const { id } = params;
  const { data } = await NotesApi.getNoteById(id);

  if (!data) notFound();

  return (
    <Fragment>
      <SingleNote note={data} />
    </Fragment>
  );
}
