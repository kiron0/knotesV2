"use server"

import getBaseURL from "@/utils/baseUrl";

async function getAllNote() {
          try {
                    const BASE_URL = await getBaseURL() + '/api';

                    const result = await fetch(`${BASE_URL}/notes`, {
                              cache: 'no-store',
                    })

                    const data = await result.json();

                    return data;
          } catch (error) {
                    console.log(error);
          }
}

async function getNoteById(id: string) {
          const BASE_URL = await getBaseURL() + '/api';

          try {
                    if (!id) return null;

                    const result = await fetch(`${BASE_URL}/notes/${id}`, {
                              next: {
                                        revalidate: 10,
                              }
                    })

                    const data = await result.json();

                    return data;
          } catch (error) {
                    console.log(error);
          }
}

async function createNewNote(data: { title: string, description: string }) {
          try {
                    const BASE_URL = await getBaseURL() + '/api';

                    const result = await fetch(`${BASE_URL}/notes`, {
                              method: 'POST',
                              headers: {
                                        'Content-Type': 'application/json',
                              },
                              body: JSON.stringify(data),
                    })

                    const newNote = await result.json();

                    return newNote;
          } catch (error) {
                    console.log(error);
          }
}

export const NotesApi = {
          getAllNote,
          getNoteById,
          createNewNote,
}