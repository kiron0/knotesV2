"use client";

import dynamic from "next/dynamic";
import { ComponentProps } from "react";
import "react-quill/dist/quill.snow.css";

const QuillEditor = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <EditorSkeleton />,
});

interface EditorProps extends ComponentProps<typeof QuillEditor> {
  value: string;
  onChange: (value: string) => void;
}

export default function Editor({ value, onChange, ...props }: EditorProps) {
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      ["link"],
      [{ color: [] }],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "link",
    "color",
  ];

  return (
    <QuillEditor
      value={value}
      onChange={onChange}
      modules={quillModules}
      formats={quillFormats}
      placeholder="Write something amazing..."
      className="w-full h-[20rem] md:h-[25rem] bg-transparent"
      {...props}
    />
  );
}

function EditorSkeleton() {
  return (
    <div className="w-full h-[23rem] md:h-[28rem] bg-gray-200 animate-pulse border border-border rounded-2xl" />
  );
}
