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
                              className="glass bg-gradient-to-br md:bg-gradient-to-tl to-[#95c0ff] from-[#cf9aff] text-white py-3 px-4 rounded-br-xl uppercase font-semibold -mt-1 focus:outline-none focus:shadow-outline"
                              onClick={handleNoteDownload}
                    >
                              <FiDownload />
                    </button>
          )
}