import { BASE_URL } from "./config";

async function getAllNote() {
          const result = await fetch(`${BASE_URL}/notes`, {
                    cache: 'no-store',
          })

          const data = await result.json();

          return data;
}

async function getNoteById(id: string) {
          try {
                    if (!id) return null;

                    const result = await fetch(`${BASE_URL}/notes/${id}`, {
                              cache: 'no-store',
                    })

                    const data = await result.json();

                    return data;
          } catch (error) {
                    console.log(error);
          }
}

async function createNewNote(data: {
          title: string,
          description: string,
}) {
          const result = await fetch(`${BASE_URL}/notes`, {
                    method: 'POST',
                    headers: {
                              'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
          })

          const newNote = await result.json();

          return newNote;
}

export const NotesApi = {
          getAllNote,
          getNoteById,
          createNewNote,
}