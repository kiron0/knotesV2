"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-3">
      <h2>Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="btn btn-sm bg-gradient-to-br md:bg-gradient-to-tl to-[#95c0ff] from-[#cf9aff] text-white border-none font-semibold"
      >
        Try again
      </button>
    </div>
  );
}
