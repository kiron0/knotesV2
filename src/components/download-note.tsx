"use client"

import { notifyInfo, notifySuccess } from '@/components/toast';
import { convert } from 'html-to-text';
import { FiDownload } from "react-icons/fi";

export default function DownloadNote(noteProps: any) {
          const { note } = noteProps;

          const handleNoteDownload = () => {
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

                              notifySuccess('Success', 'Note downloaded');
                    } else {
                              notifyInfo('Info', 'Nothing to download');
                    }
          }

          return (
                    <button
                              className="py-2 px-3 font-semibold"
                              onClick={handleNoteDownload}
                    >
                              <FiDownload />
                    </button>
          )
}