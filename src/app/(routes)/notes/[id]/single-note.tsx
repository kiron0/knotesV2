"use client";

import CopyNote from "@/components/copy-note";
import DownloadNote from "@/components/download-note";
import { logo, shortTitle } from "@/constant";
import { TNote } from "@/types";
import { json } from "@codemirror/lang-json";
import CodeMirror from "@uiw/react-codemirror";
import Image from "next/image";
import Link from "next/link";
import { GoHeartFill } from "react-icons/go";
import { PiArrowElbowRightDownLight } from "react-icons/pi";
import { RiHomeHeartLine } from "react-icons/ri";

export default function SingleNote({ note }: { note: TNote }) {
  return (
    <div className="relative">
      <div className="lg:container px-3 mx-auto py-8">
        <div className="text-2xl md:text-4xl lg:text-5xl select-none font-bold mb-4 text-center flex md:justify-center items-center gap-1">
          <p className="flex items-center gap-1">
            <Image
              src={logo}
              draggable={false}
              className="w-10 md:w-12 select-none"
              alt={shortTitle}
            />
            {shortTitle}
          </p>
        </div>

        <div className="mb-4">
          <div className="mt-10">
            <h3 className="text-xs select-none font-semibold text-primary flex items-center gap-1">
              Title <PiArrowElbowRightDownLight className="text-xs" />
            </h3>
            <p className="pt-2 w-full select-none mb-4 md:mb-0 font-solaimanLipi">
              {note?.title}
            </p>
          </div>
          <div className="mt-8">
            <h3 className="text-xs select-none font-semibold text-primary flex items-center gap-1">
              Description <PiArrowElbowRightDownLight className="text-xs" />
            </h3>
            {note?.type === "text" ? (
              <div
                className="pt-2 w-full h-fit select-none overflow-y-auto mb-4 font-solaimanLipi"
                dangerouslySetInnerHTML={{
                  __html: note?.description,
                }}
              />
            ) : (
              <CodeMirror
                value={note?.description}
                height="600px"
                extensions={[json()]}
                editable={false}
                className="px-0.5 pb-0.5 mt-2"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-5 pt-5">
          <p className="text-xs glass uppercase cursor-default no-animation font-semibold py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline text-center select-none flex items-center gap-1">
            Thanks for using <GoHeartFill />{" "}
            <span className="font-bold">{shortTitle}!</span>
          </p>
          <div className="flex justify-center items-center glass rounded-xl">
            <span className="sm:tooltip" data-tip="Copy Note">
              <CopyNote note={note} />
            </span>
            <span className="sm:tooltip" data-tip="Home">
              <Link href="/">
                <button className="border-r py-2 px-3 font-semibold">
                  <RiHomeHeartLine size={18} />
                </button>
              </Link>
            </span>
            <span className="sm:tooltip sm:tooltip-left" data-tip="Download">
              <DownloadNote note={note} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
