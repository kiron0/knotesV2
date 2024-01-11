'use client'

import Logo from '@/assets/notes.png';
import Image from 'next/image';

type ToastProps = {
          title: string,
          subtitle: string
};

export default function CustomToastMessage({ title, subtitle }: ToastProps) {
          return (
                    <div className={`animate-leave shadow-xl rounded-lg border pointer-events-auto w-full flex ring-1 ring-black ring-opacity-5`}
                              style={{ backgroundColor: '#fff', padding: '0.75rem 1rem', width: '20rem' }}
                    >
                              <div className="flex-1 w-0 p-4">
                                        <div className="flex items-start">
                                                  <div className="flex-shrink-0 pt-0.5">
                                                            <Image
                                                                      className="h-10 w-10"
                                                                      src={Logo}
                                                                      alt={'KNotes Logo'}
                                                            />
                                                  </div>
                                                  <div className="ml-3 w-0 flex-1">
                                                            <p className="text-sm font-semibold text-gray-900">
                                                                      {title}
                                                            </p>
                                                            <p className="mt-1 text-sm text-gray-500">
                                                                      {subtitle}
                                                            </p>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          )
}
