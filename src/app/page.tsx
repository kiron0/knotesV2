import Logo from "@/assets/notes.png";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
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
      <div className='flex justify-center items-center pb-3'>
        <p className="text-xs md:text-sm glass uppercase cursor-default no-animation font-semibold bg-gradient-to-bl md:bg-gradient-to-tl from-[#cf9aff] to-[#95c0ff] text-white py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline">
          Developed by <a href="https://toufiqhasankiron.com" target="_blank" rel="noreferrer" className='font-bold'>Toufiq Hasan Kiron</a>
        </p>
      </div>
    </div>
  )
}
