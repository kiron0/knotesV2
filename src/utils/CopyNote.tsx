"use client"

import CustomToastMessage from "@/utils/CustomToastMessage";
import { convert } from 'html-to-text';
import { toast } from "react-hot-toast";
import { FiClipboard } from "react-icons/fi";


export default function CopyNote(noteProps: any) {
  const { note } = noteProps;

  const handleCopyNote = () => {
    if (note.title && note.description !== '<p><br></p>') {
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
    } else {
      toast.custom(() => (
        <CustomToastMessage
          title="Warning"
          subtitle="Nothing to copy"
        />
      ));
    }
  }

  return (
    <button
      className="border-r py-2 px-3 font-semibold"
      onClick={handleCopyNote}
    >
      <FiClipboard />
    </button>
  )
}