'use client';

import Link from 'next/link';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import React, { ReactNode, useState } from 'react';

interface CardProps {
    className?: string;
    time: string;
    badge: string;
    link?: {
        href: string;
        name: string;
    };
    button?: {
        onClick: () => void;
        name: string;
    };
    title: string;
    children: React.ReactNode;
}

export default function Card({
    className,
    time,
    badge,
    link,
    button,
    title,
    children,
}: CardProps): ReactNode {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div
                className={`${className} w-full h-fit rounded-lg border border-zinc-200 text-zinc-900 bg-white dark:border-zinc-800 dark:text-white hover:bg-zinc-100 dark:bg-black dark:hover:bg-zinc-900`}>
                <div className="p-5">
                    <div className="flex justify-between items-center">
                        <div className="mb-2.5">
                            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300">
                                {time}
                            </span>
                            <span className="bg-blue-700 text-white text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                                {badge}
                            </span>
                        </div>

                        <div>
                            <div
                                className="cursor-pointer"
                                onClick={toggleMenu}>
                                <EllipsisVerticalIcon className="w-6 h-6 dark:text-white" />
                            </div>
                            {isOpen && (
                                <div className="relative">
                                    <ul className="absolute right-0 rounded-lg shadow-md backdrop-blur-lg bg-black/20 dark:bg-white/10">
                                        <li>
                                            {link && (
                                                <Link href={link?.href}>
                                                    <div className="mr-2 px-4 py-2 text-zinc-900 hover:text-zinc-700 dark:text-zinc-300 dark:hover:text-zinc-500 cursor-pointer">
                                                        {link?.name}
                                                    </div>
                                                </Link>
                                            )}
                                        </li>
                                        <li>
                                            {button && (
                                                <button
                                                    onClick={button.onClick}
                                                    className="px-4 py-2 text-zinc-900 hover:text-zinc-700 dark:text-zinc-300 dark:hover:text-zinc-500">
                                                    {button.name}
                                                </button>
                                            )}
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    <h5 className="mb-2 text-2xl font-bold tracking-tight truncate">
                        {title}
                    </h5>
                    <p className="mb-3 font-light truncate">{children}</p>
                </div>
            </div>
        </>
    );
}
