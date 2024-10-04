"use client";

import { notifyInfo, notifySuccess } from "@/components/toast";
import { TNote } from "@/types";
import { convert } from "html-to-text";
import { FiClipboard } from "react-icons/fi";

export default function CopyNote({ note }: { note: TNote }) {
  const handleCopyNote = () => {
    if (note.title && note.description !== "<p><br></p>") {
      const plainTextDescription: string = convert(note.description, {
        wordwrap: 130,
        preserveNewlines: true,
      });

      const fileContent: string =
        note?.type === "text"
          ? `${note.title}\n\n${plainTextDescription}`
          : note.description;

      navigator.clipboard.writeText(fileContent).then(() => {
        notifySuccess("Success", "Note copied to clipboard");
      });
    } else {
      notifyInfo("Info", "Nothing to copy");
    }
  };

  return (
    <button
      className="border-r py-2 px-3 font-semibold"
      onClick={handleCopyNote}
    >
      <FiClipboard />
    </button>
  );
}
