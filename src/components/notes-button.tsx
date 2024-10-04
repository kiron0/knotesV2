"use client";
import Link from "next/link";
import { FiClipboard, FiDownload, FiShare2 } from "react-icons/fi";
import { RiHomeHeartLine } from "react-icons/ri";
import { RxReset } from "react-icons/rx";

type NotesButtonProps = {
  handleCopyNote: () => void;
  handleClearNote: () => void;
  handleDownloadNote: () => void;
  handleShareNote: () => void;
};

export default function NotesButton({
  handleCopyNote,
  handleClearNote,
  handleDownloadNote,
  handleShareNote,
}: NotesButtonProps) {
  return (
    <div className="absolute bottom-5 md:bottom-8 left-1/2 transform -translate-x-1/2">
      <div className="flex justify-center items-center gap-3 glass px-2 py-1.5 rounded-xl">
        <span className="sm:tooltip" data-tip="Copy Note">
          <button
            className="border-r py-2 px-3 font-semibold"
            onClick={handleCopyNote}
          >
            <FiClipboard />
          </button>
        </span>
        <span className="sm:tooltip" data-tip="Clear Note">
          <button
            className="border-r py-2 px-3 font-semibold"
            onClick={handleClearNote}
          >
            <RxReset />
          </button>
        </span>
        <span className="sm:tooltip" data-tip="Home">
          <Link href="/">
            <button className="border-r py-2 px-3 font-semibold">
              <RiHomeHeartLine size={20} />
            </button>
          </Link>
        </span>
        <span className="sm:tooltip" data-tip="Download Note">
          <button
            className="border-r py-2 px-3 font-semibold"
            onClick={handleDownloadNote}
          >
            <FiDownload />
          </button>
        </span>
        <span className="sm:tooltip" data-tip="Share Note">
          <button className="py-2 px-3 font-semibold" onClick={handleShareNote}>
            <FiShare2 />
          </button>
        </span>
      </div>
    </div>
  );
}
