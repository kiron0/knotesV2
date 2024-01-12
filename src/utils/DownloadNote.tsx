"use client"

import CustomToastMessage from "@/utils/CustomToastMessage";
import { toast } from "react-hot-toast";
import { FiDownload } from "react-icons/fi";


export default function DownloadNote(noteProps: any) {
          const { note } = noteProps;

          const handleNoteDownload = () => {
                    if (note.title || note.description) {
                              const element = document.createElement('a');
                              const file = new Blob([`${note.title}\n\n\n${note.description}`], { type: 'text/plain' });
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
                                                  subtitle="Note is empty!"
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