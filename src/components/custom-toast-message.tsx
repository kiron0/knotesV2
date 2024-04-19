'use client'

import logo from '@/assets/logo2.webp';
import Image from 'next/image';

type ToastProps = {
          title: string,
          message: string,
          type: 'success' | 'error' | 'info'
};

export default function CustomToastMessage({ title, message, type }: ToastProps) {
          return (
                    <div className={`animate-leave rounded-lg shadow-lg ${type === "success" ? "bg-gradient-to-br md:bg-gradient-to-l to-[#4448E6] from-[#875FE7]" : type === "info" ? "bg-info" : "bg-error"} text-white w-full flex`}
                              style={{ padding: '1rem 1rem', width: '20rem' }}>
                              <div className="flex-1 w-0">
                                        <div className="flex items-center justify-center gap-3">
                                                  <div className="flex-shrink-0 pt-0.5">
                                                            <Image
                                                                      className="h-10 w-10"
                                                                      src={logo}
                                                                      alt={'KNotes Logo'}
                                                            />
                                                  </div>
                                                  <div className="ml-3 w-0 flex-1">
                                                            <h2 className="font-bold text-sm">
                                                                      {title}
                                                            </h2>
                                                            <p className="mt-1 text-xs">
                                                                      {message}
                                                            </p>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          )
}
