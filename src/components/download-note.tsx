"use client";

import { notifyInfo, notifySuccess } from "@/components/toast";
import { TNote } from "@/types";
import { convert } from "html-to-text";
import { FiDownload } from "react-icons/fi";

export default function DownloadNote({ note }: { note: TNote }) {
  const handleNoteDownload = () => {
    if (note.title && note.description !== "<p><br></p>") {
      const element: HTMLAnchorElement = document.createElement("a");

      const plainTextDescription: string = convert(note.description, {
        wordwrap: 130,
        preserveNewlines: true,
      });

      const fileContent: string =
        note?.type === "text"
          ? `${note.title}\n\n${plainTextDescription}`
          : note.description;
      const file: Blob = new Blob([fileContent], {
        type:
          note?.type === "text"
            ? "text/plain;charset=utf-8"
            : "application/json;charset=utf-8",
      });
      element.href = URL.createObjectURL(file);
      element.download = `${note.title}.${note?.type === "text" ? "txt" : "json"}`;
      document.body.appendChild(element);
      element.click();

      notifySuccess("Success", "Note downloaded");
    } else {
      notifyInfo("Info", "Nothing to download");
    }
  };

  return (
    <button className="py-2 px-3 font-semibold" onClick={handleNoteDownload}>
      <FiDownload />
    </button>
  );
}
