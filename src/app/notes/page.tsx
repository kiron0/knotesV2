'use client'

import LogoImg from "@/assets/notes.png";
import CustomToastMessage from "@/utils/CustomToastMessage";
import { NotesApi } from "@/utils/notes";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiClipboard, FiDownload, FiShare2 } from "react-icons/fi";
import { RiHomeHeartLine } from "react-icons/ri";
import { RxReset } from "react-icons/rx";
import Swal from "sweetalert2";

const metadata: Metadata = {
          title: 'Create Note - KNotes',
          description: 'A simple note sharing app, where you can share notes with others.',
}

export default function Notes() {
          const kNotes = typeof window !== "undefined" ? (window.localStorage.getItem('kNotes') ? JSON.parse(window.localStorage.getItem('kNotes') as string) : {
                    title: '',
                    description: '',
          }) : false;

          const [note, setNote] = useState(kNotes);

          const handleNoteChange = (title: string, description: string) => {
                    const updatedNote = { title, description };

                    if (title.length > 50) {
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
                    if (!note.title && !note.description) {
                              toast.custom(() =>
                                        <CustomToastMessage
                                                  title="Warning"
                                                  subtitle="Nothing to copy"
                                        />
                              )
                    } else {
                              navigator.clipboard.writeText(`${note.title}\n\n\n${note.description}`)
                                        .then(() => {
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
                    if (!note.title && !note.description) {
                              toast.custom(() =>
                                        <CustomToastMessage
                                                  title="Warning"
                                                  subtitle="Nothing to clear"
                                        />
                              )
                              return;
                    }
                    const updatedNote = { title: '', description: '' };
                    setNote(updatedNote);
                    typeof window !== "undefined" && window.localStorage.removeItem('kNotes');
          }

          const handleDownloadNote = () => {
                    if (note.title || note.description) {
                              const element = document.createElement('a');
                              const file = new Blob([`${note.title}\n\n\n${note.description}`], { type: 'text/plain;charset=utf-8' });
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
                    }
          }

          const handleShareNote = () => {
                    if (!note.description) {
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
                                        }).catch(() => {
                                                  toast.custom(() =>
                                                            <CustomToastMessage
                                                                      title="Error"
                                                                      subtitle="Failed to copy note to clipboard"
                                                            />
                                                  )
                                        });

                                        setNote({
                                                  title: '',
                                                  description: '',
                                        });

                                        typeof window !== "undefined" && window.localStorage.removeItem('kNotes');
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
                                                  <Link href='/' className="flex items-center gap-1"><Image src={LogoImg} className='w-10 md:w-12' alt="" />KNotes</Link>
                                        </div>
                                        <div className="mb-4">
                                                  <div className="name border rounded-xl relative mt-10">
                                                            <div className="name-title absolute -top-4 ml-3 bg-base-100 border rounded-lg p-1">
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
                                                  <div className="name border rounded-xl relative mt-8">
                                                            <div className="name-title absolute -top-4 ml-3 bg-base-100 border rounded-lg p-1">
                                                                      <h3 className="text-xs font-poppins">Type description</h3>
                                                            </div>
                                                            <textarea
                                                                      typeof='text'
                                                                      className="textarea focus:outline-none border-none w-full bg-transparent mt-3 resize-none h-[25rem]"
                                                                      value={note.description}
                                                                      placeholder="Type note description here..."
                                                                      onChange={(e) => handleNoteChange(note.title, e.target.value)}
                                                                      aria-labelledby='description'
                                                            />
                                                  </div>
                                        </div>
                              </div>
                              <div className="absolute bottom-5 md:bottom-8 left-1/2 transform -translate-x-1/2">
                                        <div className="flex justify-center items-center gap-3 glass px-2 py-1.5 rounded-xl">
                                                  <span className='sm:tooltip' data-tip="Copy Note">
                                                            <button className="border-r py-2 px-3 font-semibold" onClick={handleCopyNote}>
                                                                      <FiClipboard />
                                                            </button>
                                                  </span>
                                                  <span className='sm:tooltip' data-tip="Clear Note">
                                                            <button className="border-r py-2 px-3 font-semibold" onClick={handleClearNote}>
                                                                      <RxReset />
                                                            </button>
                                                  </span>
                                                  <span className='sm:tooltip' data-tip="Home">
                                                            <Link href='/'>
                                                                      <button className="border-r py-2 px-3 font-semibold">
                                                                                <RiHomeHeartLine size={20} />
                                                                      </button>
                                                            </Link>
                                                  </span>
                                                  <span className='sm:tooltip' data-tip="Download Note">
                                                            <button className="border-r py-2 px-3 font-semibold" onClick={handleDownloadNote}>
                                                                      <FiDownload />
                                                            </button>
                                                  </span>
                                                  <span className='sm:tooltip' data-tip="Share Note">
                                                            <button className="py-2 px-3 font-semibold" onClick={handleShareNote}>
                                                                      <FiShare2 />
                                                            </button>
                                                  </span>
                                        </div>
                              </div>
                    </div>
          )
}
