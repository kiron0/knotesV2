'use client'

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

interface EditorProps {
          value: string;
          onChange: (value: string) => void;
}

export default function Editor({ value, onChange }: EditorProps) {

          const quillModules = {
                    toolbar: [
                              [{ header: [1, 2, 3, false] }],
                              ['bold', 'italic', 'underline', 'strike'],
                              ['link'],
                              [{ color: [] }],
                    ],
          };


          const quillFormats = [
                    'header',
                    'bold',
                    'italic',
                    'underline',
                    'strike',
                    'link',
                    'color',
          ];

          return (
                    <QuillEditor
                              value={value}
                              onChange={onChange}
                              modules={quillModules}
                              formats={quillFormats}
                              placeholder="Write something amazing..."
                              className="w-full h-[20rem] md:h-[25rem] bg-transparent"
                    />
          );
}