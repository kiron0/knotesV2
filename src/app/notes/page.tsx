'use client'

import LogoImg from "@/assets/notes.png";
import { NotesApi } from "@/utils/notes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiClipboard, FiDownload, FiShare2 } from "react-icons/fi";
import { RxReset } from "react-icons/rx";
import Swal from "sweetalert2";

export default function Notes() {
          const kNotes = typeof window !== "undefined" ? (window.localStorage.getItem('kNotes') ? JSON.parse(window.localStorage.getItem('kNotes') as string) : {
                    title: '',
                    description: '',
          }) : false;

          const [note, setNote] = useState(kNotes);

          const handleNoteChange = (title: string, description: string) => {
                    const updatedNote = { title, description };
                    setNote(updatedNote);

                    typeof window !== "undefined" && window.localStorage.setItem('kNotes', JSON.stringify(updatedNote));
          };

          const handleCopyNote = () => {
                    if (note.title || note.description) {
                              navigator.clipboard.writeText(`Title: ${note.title}\n\nDescription: ${note.description}`);
                              toast.success('Note copied to clipboard');
                    } else {
                              toast.error('Note is empty');
                    }
          }

          const handleClearNote = () => {
                    const updatedNote = { title: '', description: '' };
                    setNote(updatedNote);
                    typeof window !== "undefined" && window.localStorage.removeItem('kNotes', JSON.stringify(note));
          }

          const handleDownloadNote = () => {
                    if (note.title || note.description) {
                              const element = document.createElement('a');
                              const file = new Blob([`Title: ${note.title}\n\nDescription: ${note.description}`], { type: 'text/plain' });
                              element.href = URL.createObjectURL(file);
                              element.download = `${note.title.slice(0, 15)}.txt`;
                              document.body.appendChild(element);
                              element.click();
                    } else {
                              toast.error('Note is empty');
                    }
          }

          const handleShareNote = () => {
                    if (!note.description) {
                              toast.error('Note is empty');
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
                                                  toast.success('Shareable link copied to clipboard');
                                        }).catch(() => {
                                                  toast.error('Failed to copy note to clipboard');
                                        });

                                        setNote({
                                                  title: '',
                                                  description: '',
                                        });

                                        typeof window !== "undefined" && window.localStorage.removeItem('kNotes', JSON.stringify(note));
                              }
                    })
          }

          useEffect(() => {
                    if (note) {
                              typeof window !== "undefined" && window.localStorage.setItem('kNotes', JSON.stringify(note));
                    }
          }, [note]);

          return (
                    <div className="lg:container px-3 mx-auto py-8">
                              <Link href='/' className="text-2xl md:text-4xl lg:text-5xl select-none font-bold mb-4 text-center flex md:justify-center items-center gap-1"><Image src={LogoImg} className='w-10 md:w-12' alt="" />KNotes</Link>
                              <div className="mb-4">
                                        <div className="name border rounded-xl relative mt-10">
                                                  <div className="name-title absolute -top-4 ml-3 bg-base-100 border rounded-lg p-1">
                                                            <h3 className="text-xs font-poppins">Type title</h3>
                                                  </div>
                                                  <input
                                                            type='text'
                                                            className="input focus:outline-none border-none w-full text-sm bg-transparent"
                                                            placeholder="Type your note title here..."
                                                            value={note.title}
                                                            onChange={(e) => handleNoteChange(e.target.value, note.description)}
                                                  />
                                        </div>
                                        <div className="name border rounded-xl rounded-br-none relative mt-8">
                                                  <div className="name-title absolute -top-4 ml-3 bg-base-100 border rounded-lg p-1">
                                                            <h3 className="text-xs font-poppins">Type description</h3>
                                                  </div>
                                                  <textarea
                                                            typeof='text'
                                                            className="textarea focus:outline-none border-none w-full bg-transparent mt-3 resize-none h-[25rem]"
                                                            value={note.description}
                                                            placeholder="Type your note here..."
                                                            onChange={(e) => handleNoteChange(note.title, e.target.value)}
                                                            aria-labelledby='description'
                                                  />
                                        </div>
                                        <div className='flex justify-end items-center gap-1 mt-2'>
                                                  <span className='tooltip' data-tip="Copy Note">
                                                            <button
                                                                      className="glass bg-gradient-to-br md:bg-gradient-to-tl to-[#95c0ff] from-[#cf9aff] text-white py-3 px-4 rounded-bl-xl uppercase font-semibold -mt-1 focus:outline-none focus:shadow-outline"
                                                                      onClick={handleCopyNote}>
                                                                      <FiClipboard />
                                                            </button>
                                                  </span>
                                                  <span className='tooltip' data-tip="Clear Note">
                                                            <button
                                                                      className="glass bg-gradient-to-tl md:bg-gradient-to-br from-[#cf9aff] to-[#95c0ff] text-white py-3 px-4 rounded-none uppercase font-semibold -mt-1 focus:outline-none focus:shadow-outline"
                                                                      onClick={handleClearNote}>
                                                                      <RxReset />
                                                            </button>
                                                  </span>
                                                  <span className='tooltip' data-tip="Download Note">
                                                            <button
                                                                      className="glass bg-gradient-to-br md:bg-gradient-to-tl to-[#95c0ff] from-[#cf9aff] text-white py-3 px-4 rounded-none uppercase font-semibold -mt-1 focus:outline-none focus:shadow-outline"
                                                                      onClick={handleDownloadNote}
                                                            >
                                                                      <FiDownload />
                                                            </button>
                                                  </span>
                                                  <span className='tooltip' data-tip="Share Note">
                                                            <button
                                                                      className="glass bg-gradient-to-tl md:bg-gradient-to-br to-[#95c0ff] from-[#cf9aff] text-white py-3 px-4 rounded-br-xl uppercase font-semibold -mt-1 focus:outline-none focus:shadow-outline"
                                                                      onClick={handleShareNote}>
                                                                      <FiShare2 />
                                                            </button>
                                                  </span>
                                        </div>
                              </div>
                    </div>
          )
}
