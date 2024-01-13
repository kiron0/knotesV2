"use client"

import CustomToastMessage from "@/utils/CustomToastMessage";
import { convert } from 'html-to-text';
import { toast } from "react-hot-toast";
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

                              toast.custom(() => (
                                        <CustomToastMessage
                                                  title="Success"
                                                  subtitle="Note downloaded!"
                                        />
                              ));
                    } else {
                              toast.custom(() => (
                                        <CustomToastMessage
                                                  title="Warning"
                                                  subtitle="Nothing to download!"
                                        />
                              ));
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