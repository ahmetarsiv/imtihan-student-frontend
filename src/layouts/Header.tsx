'use client';

import Link from 'next/link';
import React from 'react';

interface IHeaderProps {
    className?: string;
    name: string;
}

export default function Header({ className, name }: IHeaderProps) {
    return (
        <header
            className={`${className} fixed w-full backdrop-blur-sm border-b border-zinc-100 px-2 sm:px-4 py-2.5 dark:bg-black/30 dark:border-zinc-900 z-10`}>
            <div className="font-medium select-none text-2xl text-center sm:block md:blcok lg:blcok xl:blcok 2xl:blcok block text-zinc-900 dark:text-white">
                <Link href="/">{name}</Link>
            </div>
        </header>
    );
}
