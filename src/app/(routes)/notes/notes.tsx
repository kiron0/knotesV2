"use client";

import Editor from "@/components/editor";
import NotesButton from "@/components/notes-button";
import { notifyError, notifyInfo, notifySuccess } from "@/components/toast";
import { logo, shortTitle } from "@/constant";
import { NotesApi } from "@/server/action/notesApi";
import { TNote } from "@/types";
import { json } from "@codemirror/lang-json";
import CodeMirror from "@uiw/react-codemirror";
import { convert } from "html-to-text";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, DragEvent, Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Notes() {
  const kNotes =
    typeof window !== "undefined"
      ? window.localStorage.getItem("kNotes")
        ? JSON.parse(window.localStorage.getItem("kNotes") as string)
        : {
            type: "text",
            title: "",
            description: "<p><br></p>",
          }
      : false;

  const [note, setNote] = useState<TNote>(kNotes);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<"text" | "json">("text");
  const [wantToImport, setWantToImport] = useState(false);
  const [isJsonFile, setIsJsonFile] = useState(false);
  const [dragOverFile, setDragOverFile] = useState(false);

  const handleNoteChange = (title: string, description: string) => {
    const updatedNote = { type, title, description };

    if (title.length > 200) {
      return notifyInfo("Info", "Title should be less than 200 characters");
    }

    setNote(updatedNote);

    typeof window !== "undefined" &&
      window.localStorage.setItem("kNotes", JSON.stringify(updatedNote));
  };

  const handleCopyNote = () => {
    if (!note.title && note.description === "<p><br></p>") {
      return notifyInfo("Info", "Nothing to copy");
    } else {
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
    }
  };

  const handleClearNote = () => {
    if (!note.title && note.description === "<p><br></p>") {
      return notifyInfo("Info", "Nothing to clear");
    }
    const updatedNote = {
      type: "text",
      title: "",
      description: "<p><br></p>",
    } as TNote;
    setNote(updatedNote);
    typeof window !== "undefined" && window.localStorage.removeItem("kNotes");
  };

  const handleDownloadNote = () => {
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

  const handleShareNote = () => {
    if (!note.title && note.description === "<p><br></p>") {
      return notifyInfo("Info", "Nothing to share");
    }

    Swal.fire({
      text: "Share this note?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Copy Link",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);

        const { data } = await NotesApi.createNewNote(note);

        const noteId = data.id;
        const url = typeof window !== "undefined" ? window.location.href : "";
        const noteUrl = `${url}/${noteId}`;

        navigator.clipboard
          .writeText(noteUrl)
          .then(() => {
            notifySuccess("Success", "Shareable link copied to clipboard");
            const updatedNote = {
              type: "text",
              title: "",
              description: "<p><br></p>",
            } as TNote;
            setNote(updatedNote);
            setLoading(false);
            typeof window !== "undefined" &&
              window.localStorage.removeItem("kNotes");
            type === "json" && setIsJsonFile(false);
          })
          .catch(() => {
            notifyError("Error", "Failed to copy link to clipboard");
          });
      }
    });
  };

  const readFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result as string;
      try {
        setNote({
          ...note,
          type: "json",
          description: text,
        });
        setIsJsonFile(true);
        setWantToImport(false);
      } catch (error) {
        notifyError("Error", "An error occurred while reading the file.");
      }
    };

    reader.onerror = () => {
      notifyError("Error", "An error occurred while reading the file.");
    };

    reader.readAsText(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return notifyError("Error", "No file was selected.");
    }

    if (file.type !== "application/json") {
      return notifyError(
        "Error",
        "Invalid file type. Only JSON files are allowed.",
      );
    }

    readFile(file);
  };

  const handleFileDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];

    if (!file) {
      setDragOverFile(false);
      return notifyError("Error", "No file was dropped.");
    }

    if (file.type !== "application/json") {
      setDragOverFile(false);
      return notifyError(
        "Error",
        "Invalid file type. Only JSON files are allowed.",
      );
    }

    readFile(file);
    setDragOverFile(false);
  };

  useEffect(() => {
    if (note) {
      typeof window !== "undefined" &&
        window.localStorage.setItem("kNotes", JSON.stringify(note));
    }
  }, [note]);

  return (
    <div className="relative h-screen">
      <div className="lg:container px-3 mx-auto py-8">
        <div className="text-2xl md:text-4xl lg:text-5xl select-none font-bold mb-4 text-center flex md:justify-center items-center gap-1">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src={logo}
              draggable={false}
              className="w-10 md:w-12 select-none"
              alt={shortTitle}
            />
            {shortTitle}
          </Link>
        </div>
        <div className="mb-4">
          <div className="name border rounded-xl relative mt-10">
            <div className="select-none absolute -top-4 ml-3 bg-base-100 border rounded-lg p-1">
              <h3 className="text-xs">Type title</h3>
            </div>
            <input
              type="text"
              className="input focus:outline-none border-none w-full text-sm bg-transparent"
              placeholder="Type note title here..."
              value={note.title}
              onChange={(e) =>
                handleNoteChange(e.target.value, note.description)
              }
              readOnly={loading}
            />
          </div>
          <div className="pt-4 flex items-center gap-2">
            <input
              id="type"
              type="checkbox"
              checked={type === "json"}
              onChange={() => {
                setType(type === "text" ? "json" : "text");
                setIsJsonFile(false);
              }}
              disabled={wantToImport || isJsonFile}
              className="checkbox checkbox-sm"
            />
            <label
              htmlFor="type"
              className="text-sm text-gray-500 select-none cursor-pointer"
            >
              Want to add JSON data?
            </label>
          </div>
          {type === "text" ? (
            <div className="name relative mt-8">
              <div className="select-none absolute -top-4 ml-3 z-10 bg-base-100 border rounded-lg p-1">
                <h3 className="text-xs">Type description</h3>
              </div>
              {loading ? (
                <div className="w-full h-[20rem] md:h-[25rem] border rounded-xl relative">
                  <div
                    className="p-4 absolute top-0 left-0 w-full h-full select-none overflow-auto z-0 text-gray-400"
                    dangerouslySetInnerHTML={{
                      __html: note?.description,
                    }}
                  />
                  <div className="flex justify-center items-center h-full bg-gray-200 rounded-xl z-10">
                    <p className="text-xl sm:text-2xl font-bold">
                      Sharing... Please wait
                    </p>
                  </div>
                </div>
              ) : (
                <Editor
                  value={
                    note.type === "text" ? note.description : "<p><br></p>"
                  }
                  onChange={(value) => handleNoteChange(note.title, value)}
                />
              )}
            </div>
          ) : (
            <Fragment>
              {isJsonFile ? (
                <div className="flex justify-end">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      setNote({
                        ...note,
                        type: "text",
                        description: "<p><br></p>",
                      });
                      setIsJsonFile(false);
                    }}
                  >
                    Remove File
                  </button>
                </div>
              ) : (
                <div className="pt-4 flex justify-end items-center gap-2">
                  <input
                    id="wantToImport"
                    type="checkbox"
                    checked={wantToImport}
                    onChange={() => setWantToImport(!wantToImport)}
                    className="checkbox checkbox-sm"
                  />
                  <label
                    htmlFor="wantToImport"
                    className="text-sm text-gray-500 select-none cursor-pointer"
                  >
                    Want to import JSON file?
                  </label>
                </div>
              )}
              {wantToImport && !isJsonFile ? (
                <div className="space-y-2 relative mt-8">
                  <div className="select-none absolute -top-4 ml-3 z-10 bg-base-100 border rounded-lg p-1">
                    <h3 className="text-xs">JSON File</h3>
                  </div>
                  <label
                    htmlFor="json-file"
                    className="flex justify-center items-center space-x-2 sm:cursor-pointer border border-input rounded-xl h-[400px]"
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOverFile(true);
                    }}
                    onDragLeave={() => setDragOverFile(false)}
                    onDrop={handleFileDrop}
                  >
                    <span>
                      {dragOverFile
                        ? "Drop the file here"
                        : "Drag and drop a file here"}
                    </span>
                    <input
                      id="json-file"
                      type="file"
                      accept=".json"
                      className="peer"
                      hidden
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              ) : (
                <div className="name relative mt-8">
                  <div className="select-none absolute -top-4 ml-3 z-10 bg-base-100 border rounded-lg p-1">
                    <h3 className="text-xs">Type description</h3>
                  </div>
                  {loading ? (
                    <div className="w-full h-[20rem] md:h-[25rem] border rounded-xl">
                      <div className="flex justify-center items-center h-full bg-gray-200 rounded-xl z-10">
                        <p className="text-xl sm:text-2xl font-bold">
                          Sharing... Please wait
                        </p>
                      </div>
                    </div>
                  ) : (
                    <CodeMirror
                      value={note.type === "json" ? note.description : ""}
                      height="400px"
                      extensions={[json()]}
                      onChange={(value) => handleNoteChange(note.title, value)}
                      placeholder="Enter your JSON data here"
                      className="px-0.5 pb-0.5"
                    />
                  )}
                </div>
              )}
            </Fragment>
          )}
        </div>
      </div>
      <NotesButton
        handleCopyNote={handleCopyNote}
        handleClearNote={handleClearNote}
        handleDownloadNote={handleDownloadNote}
        handleShareNote={handleShareNote}
      />
    </div>
  );
}
