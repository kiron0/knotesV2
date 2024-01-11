"use client"

import { toast } from "react-hot-toast";
import { FiClipboard } from "react-icons/fi";


export default function CopyNote(noteProps: any) {
  const { note } = noteProps;

  const handleCopyNote = () => {
    if (note.title || note.description) {
      navigator.clipboard.writeText(`Title: ${note.title}\n\nDescription: ${note.description}`);
      toast.success('Note copied to clipboard');
    } else {
      toast.error('Note is empty');
    }
  }

  return (
    <button
      className="glass bg-gradient-to-br md:bg-gradient-to-tl to-[#95c0ff] from-[#cf9aff] text-white py-3 px-4 rounded-bl-xl uppercase font-semibold -mt-1 focus:outline-none focus:shadow-outline"
      onClick={handleCopyNote}
    >
      <FiClipboard />
    </button>
  )
}