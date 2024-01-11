import Logo from "@/assets/notes.png";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <Image src={Logo} alt="Logo" />
          <h1 className="text-2xl font-bold">
            Welcome to <Link href="/notes">KNotes!</Link>
          </h1>
          <p className="mt-3">
            <Link href="/notes" className="btn btn-sm bg-gradient-to-br md:bg-gradient-to-tl to-[#95c0ff] from-[#cf9aff] text-white">Get started</Link> by{" "}
            creating a note
          </p>
        </div>
      </div>
    </main>
  )
}
