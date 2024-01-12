"use client"

import CustomToastMessage from "@/utils/CustomToastMessage";
import { toast } from "react-hot-toast";
import { FiClipboard } from "react-icons/fi";


export default function CopyNote(noteProps: any) {
  const { note } = noteProps;

  const handleCopyNote = () => {
    if (note.title || note.description) {
      navigator.clipboard.writeText(`${note.title}\n\n\n${note.description}`);
      toast.custom(() => (
        <CustomToastMessage
          title="Success"
          subtitle="Note copied to clipboard!"
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
      className="border-r py-2 px-3 font-semibold"
      onClick={handleCopyNote}
    >
      <FiClipboard />
    </button>
  )
}