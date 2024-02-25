'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { setTitle } from '@/store/slices/root';
import { AppDispatch, useDispatch } from '@/store';
import {
    ArrowPathRoundedSquareIcon,
    ArrowUpTrayIcon,
    BookmarkIcon,
    ChatBubbleOvalLeftIcon,
    EllipsisVerticalIcon,
    HeartIcon,
} from '@heroicons/react/24/outline';
import Label from '@/components/Label';
import NavLink from "@/components/NavLink";

export default function FlowPage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        dispatch(setTitle('Akış'));
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <main className="flex gap-5">
                <div className="flex flex-col gap-5 w-full">
                    <div
                        className="hover:bg-zinc-50 dark:hover:bg-zinc-950 p-4 border border-zinc-50 dark:border-zinc-800 shadow">
                        <div className="flex justify-between items-center">
                            <div className="flex space-x-2">
                                <div
                                    className="inline-flex overflow-hidden relative justify-center items-center w-12 h-12 bg-zinc-200 rounded-full dark:bg-zinc-600">
                                    <span className="font-medium text-zinc-600 dark:text-zinc-300">
                                        ASA
                                    </span>
                                </div>
                                <div className="self-center">
                                    <Label className="!text-base">
                                        Ahmet Sefa Arşiv
                                    </Label>
                                    <Label>ahmetarsivpm@gmail.com • 2 sa</Label>
                                </div>
                            </div>

                            <div>
                                <div
                                    className="cursor-pointer"
                                    onClick={toggleMenu}>
                                    <EllipsisVerticalIcon className="w-6 h-6 dark:text-white"/>
                                </div>
                                {isOpen && (
                                    <div className="relative">
                                        <ul className="absolute right-0 truncate rounded-lg shadow-md backdrop-blur-lg bg-black/20 dark:bg-white/10">
                                            <li className="mr-2 px-4 py-2 text-zinc-900 hover:text-zinc-700 dark:text-zinc-300 dark:hover:text-zinc-500 cursor-pointer">
                                                @ahmetarsiv adlı kişiyi takip et
                                            </li>
                                            <li className="mr-2 px-4 py-2 text-zinc-900 hover:text-zinc-700 dark:text-zinc-300 dark:hover:text-zinc-500 cursor-pointer">
                                                @ahmetarsiv'in gönderisini
                                                bildir
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a diam et justo ultricies
                            aliquet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a diam et justo
                            ultricies aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </div>
                        <div className="flex justify-start gap-10 mt-4">
                            <ChatBubbleOvalLeftIcon className="w-5 h-6 cursor-pointer"/>
                            <ArrowPathRoundedSquareIcon className="w-5 h-6 cursor-pointer"/>
                            <HeartIcon className="w-5 h-6 cursor-pointer"/>
                            <BookmarkIcon className="w-5 h-6 cursor-pointer"/>
                            <ArrowUpTrayIcon className="w-5 h-6 cursor-pointer"/>
                        </div>
                    </div>
                </div>

                <aside
                    className="bg-white dark:bg-black sm:hidden md:hidden lg:block xl:block 2xl:block hidden w-2/5 my-4">
                    <div className="flex flex-col gap-2">
                        <h3>Premium'a Abone Ol</h3>
                        <span>Yeni özellikleri açmak için abone ol ve uygun olman durumunda reklam geliri payı kazan.</span>
                        <NavLink name={'Abone ol'} href={'/plan'}/>
                    </div>
                </aside>
            </main>
        </>
    );
}
