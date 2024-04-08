'use client'

import LogoImg from "@/assets/notes.png";
import CustomToastMessage from "@/components/custom-toast-message";
import Editor from "@/components/editor";
import NotesButton from "@/components/notes-button";
import { NotesApi } from "@/server/action/notesApi";
import { TNote } from "@/types";
import { convert } from 'html-to-text';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function Notes() {
          const kNotes = typeof window !== "undefined" ? (window.localStorage.getItem('kNotes') ? JSON.parse(window.localStorage.getItem('kNotes') as string) : {
                    title: '',
                    description: '<p><br></p>',
          }) : false;

          const [note, setNote] = useState<TNote>(kNotes);

          const handleNoteChange = (title: string, description: string) => {
                    const updatedNote = { title, description };

                    if (title.length > 60) {
                              toast.custom(() =>
                                        <CustomToastMessage
                                                  title="Warning"
                                                  subtitle="Title should be less than 50 characters"
                                        />
                              )
                              return;
                    }

                    setNote(updatedNote);

                    typeof window !== "undefined" && window.localStorage.setItem('kNotes', JSON.stringify(updatedNote));
          };

          const handleCopyNote = () => {
                    if (!note.title && note.description === '<p><br></p>') {
                              toast.custom(() =>
                                        <CustomToastMessage
                                                  title="Warning"
                                                  subtitle="Nothing to copy"
                                        />
                              )
                    } else {
                              const plainTextDescription: string = convert(note.description, {
                                        wordwrap: 130,
                                        preserveNewlines: true,
                              });

                              const fileContent: string = `${note.title}\n\n${plainTextDescription}`;

                              navigator.clipboard.writeText(fileContent).then(() => {
                                        toast.custom(() =>
                                                  <CustomToastMessage
                                                            title="Success"
                                                            subtitle="Note copied to clipboard"
                                                  />
                                        )
                              })
                    }
          }

          const handleClearNote = () => {
                    if (!note.title && note.description === '<p><br></p>') {
                              toast.custom(() =>
                                        <CustomToastMessage
                                                  title="Warning"
                                                  subtitle="Nothing to clear"
                                        />
                              )
                              return;
                    }
                    const updatedNote = { title: '', description: '<p><br></p>' };
                    setNote(updatedNote);
                    typeof window !== "undefined" && window.localStorage.removeItem('kNotes');
          }

          const handleDownloadNote = () => {
                    if (note.title && note.description !== '<p><br></p>') {
                              const element: HTMLAnchorElement = document.createElement('a');

                              const plainTextDescription: string = convert(note.description, {
                                        wordwrap: 130,
                                        preserveNewlines: true,
                              });

                              const fileContent: string = `${note.title}\n\n${plainTextDescription}`;
                              const file: Blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
                              element.href = URL.createObjectURL(file);
                              element.download = `${note.title.slice(0, 15)}.txt`;
                              document.body.appendChild(element);
                              element.click();
                    } else {
                              toast.custom(() =>
                                        <CustomToastMessage
                                                  title="Warning"
                                                  subtitle="Nothing to download"
                                        />
                              )
                              return;
                    }
          }

          const handleShareNote = () => {
                    if (!note.title && note.description === '<p><br></p>') {
                              toast.custom(() =>
                                        <CustomToastMessage
                                                  title="Warning"
                                                  subtitle="Nothing to share"
                                        />
                              )
                              return;
                    }

                    Swal.fire({
                              text: 'Share this note?',
                              icon: 'info',
                              showCancelButton: true,
                              confirmButtonText: 'Copy Link',
                              cancelButtonText: 'Cancel',
                    }).then(async (result) => {
                              if (result.isConfirmed) {
                                        const { data } = await NotesApi.createNewNote({
                                                  title: note.title,
                                                  description: note.description,
                                        });

                                        const noteId = data.id;
                                        const url = typeof window !== "undefined" ? window.location.href : '';
                                        const noteUrl = `${url}/${noteId}`;

                                        navigator.clipboard.writeText(noteUrl).then(() => {
                                                  toast.custom(() =>
                                                            <CustomToastMessage
                                                                      title="Success"
                                                                      subtitle="Shareable link copied to clipboard"
                                                            />
                                                  )
                                                  const updatedNote = { title: '', description: '<p><br></p>' };
                                                  setNote(updatedNote);
                                                  typeof window !== "undefined" && window.localStorage.removeItem('kNotes');
                                        }).catch(() => {
                                                  toast.custom(() =>
                                                            <CustomToastMessage
                                                                      title="Error"
                                                                      subtitle="Failed to copy note to clipboard"
                                                            />
                                                  )
                                        });
                              }
                    })
          }

          useEffect(() => {
                    if (note) {
                              typeof window !== "undefined" && window.localStorage.setItem('kNotes', JSON.stringify(note));
                    }
          }, [note]);

          return (
                    <div className="relative h-screen">
                              <div className="lg:container px-3 mx-auto py-8">
                                        <div className="text-2xl md:text-4xl lg:text-5xl select-none font-bold mb-4 text-center flex md:justify-center items-center gap-1">
                                                  <Link href='/' className="flex items-center gap-1"><Image src={LogoImg} draggable={false} className='w-10 md:w-12 select-none' alt="" />KNotes</Link>
                                        </div>
                                        <div className="mb-4">
                                                  <div className="name border rounded-xl relative mt-10">
                                                            <div className="select-none absolute -top-4 ml-3 bg-base-100 border rounded-lg p-1">
                                                                      <h3 className="text-xs font-poppins">Type title</h3>
                                                            </div>
                                                            <input
                                                                      type='text'
                                                                      className="input focus:outline-none border-none w-full text-sm bg-transparent"
                                                                      placeholder="Type note title here..."
                                                                      value={note.title}
                                                                      onChange={(e) => handleNoteChange(e.target.value, note.description)}
                                                            />
                                                  </div>
                                                  <div className="name relative mt-8">
                                                            <div className="select-none absolute -top-4 ml-3 bg-base-100 border rounded-lg p-1">
                                                                      <h3 className="text-xs font-poppins">Type description</h3>
                                                            </div>
                                                            <Editor value={note.description} onChange={(value) => handleNoteChange(note.title, value)} />
                                                  </div>
                                        </div>
                              </div>
                              <NotesButton handleCopyNote={handleCopyNote} handleClearNote={handleClearNote} handleDownloadNote={handleDownloadNote} handleShareNote={handleShareNote} />
                    </div>
          )
}
