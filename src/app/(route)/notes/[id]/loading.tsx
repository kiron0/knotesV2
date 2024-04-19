import { logo } from "@/constant"
import Image from "next/image"
import { PulseLoader } from "react-spinners"

export default function Loading() {
          return (
                    <div className="flex flex-col justify-center items-center h-screen">
                              <h1 className="text-2xl md:text-4xl lg:text-5xl select-none font-bold mb-4 text-center flex md:justify-center items-center gap-1">
                                        <Image src={logo} draggable={false} className='w-10 md:w-12 select-none' alt="" />KNotes
                              </h1>
                              <div className="flex justify-center items-center">
                                        <PulseLoader color='#000' size={10} />
                              </div>
                    </div>
          )
}
