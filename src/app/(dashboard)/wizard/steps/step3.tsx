'use client';

import React, { ReactNode } from 'react';
import { Button } from '@codenteq/interfeys';
import { CheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Step3Props {
    onPrev: () => void;
    onFinish: () => void;
}

export default function Step3({ onPrev, onFinish }: Step3Props): ReactNode {
    return (
        <form onSubmit={onFinish}>
            <h3 className="leading-none text-zinc-900 dark:text-white my-10">
                Fiyatlandırma
            </h3>

            <div className="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0 max-w-3xl">
                <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-zinc-900 bg-white rounded-lg border border-zinc-100 shadow dark:border-zinc-800 xl:p-8 dark:bg-zinc-950 dark:text-white">
                    <h3 className="mb-4 text-2xl font-semibold">Freemium</h3>
                    <div className="flex flex-col justify-center items-baseline my-8">
                        <span className="text-zinc-500 dark:text-zinc-400">
                            Teklif döneminden sonra ayda
                        </span>
                        <span className="mr-2 text-xl font-bold">
                            0,00 TL
                            <span className="text-base text-zinc-500 dark:text-zinc-400">
                                /1 ay ücretsiz
                            </span>
                        </span>
                    </div>

                    <ul role="list" className="mb-8 space-y-4 text-left">
                        <li className="flex items-center space-x-3">
                            <CheckIcon className="w-6 h-6 text-green-500 mr-4" />
                            <span>Çevrimiçi sınav oluşturma</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <CheckIcon className="w-6 h-6 text-green-500 mr-4" />
                            <span>Kaynaklar ve öğrenme materyalleri</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <CheckIcon className="w-6 h-6 text-green-500 mr-4" />
                            <span>Not alma ve düzenleme</span>
                        </li>
                    </ul>

                    <p className="text-zinc-500 dark:text-zinc-400 text-xs text-left mt-3.5">
                        <Link href="#">
                            <span className="underline">
                                Hüküm ve koşullar geçerlidir.{' '}
                            </span>
                        </Link>
                        Premium'u daha önce denemiş olan kullanıcılar 1 aylık
                        ücretsiz tekliften yararlanamaz.
                    </p>
                </div>
                <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-zinc-900 bg-white rounded-lg border border-zinc-100 shadow dark:border-zinc-800 xl:p-8 dark:bg-zinc-950 dark:text-white">
                    <h3 className="mb-4 text-2xl font-semibold">Premium</h3>
                    <div className="flex flex-col justify-center items-baseline my-8">
                        <span className="text-zinc-500 dark:text-zinc-400">
                            Teklif döneminden sonra ayda
                        </span>
                        <span className="mr-2 text-xl font-bold">
                            69,99 TL
                            <span className="text-base text-zinc-500 dark:text-zinc-400">
                                /1 ay ücretsiz
                            </span>
                        </span>
                    </div>

                    <ul role="list" className="mb-8 space-y-4 text-left">
                        <li className="flex items-center space-x-3">
                            <CheckIcon className="w-6 h-6 text-green-500 mr-4" />
                            <span>İlerleme takibi</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <CheckIcon className="w-6 h-6 text-green-500 mr-4" />
                            <span>Kişisel eğitim koçu</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <CheckIcon className="w-6 h-6 text-green-500 mr-4" />
                            <span>Google takvimler senkronizasyonu</span>
                        </li>
                    </ul>

                    <p className="text-zinc-500 dark:text-zinc-400 text-xs text-left mt-3.5">
                        <Link href="#">
                            <span className="underline">
                                Hüküm ve koşullar geçerlidir.{' '}
                            </span>
                        </Link>
                        Premium'u daha önce denemiş olan kullanıcılar 1 aylık
                        ücretsiz tekliften yararlanamaz.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <button type="button" onClick={onPrev} className="mr-2">
                    Önceki
                </button>
                <Button type="submit" label="Tamamla" />
            </div>
        </form>
    );
}
