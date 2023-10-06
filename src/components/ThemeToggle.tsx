'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {
    const { systemTheme, theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    const currentTheme = theme === 'system' ? systemTheme : theme;
    return (
        <>
            {currentTheme === 'dark' ? (
                <div
                    onClick={() => setTheme('light')}
                    className="border-b border-zinc-100 dark:border-zinc-900 cursor-pointer hover:bg-zinc-100 focus:bg-zinc-100 dark:hover:bg-zinc-900 dark:focus:bg-zinc-900 w-full h-full p-5">
                    <SunIcon className="text-amber-500 w-6 h-6 mr-2 float-left" />
                    <span className="text-zinc-500 dark:text-zinc-300">
                        Açık Tema
                    </span>
                    <ChevronRightIcon className="text-brand w-6 h-6 float-right" />
                </div>
            ) : (
                <div
                    onClick={() => setTheme('dark')}
                    className="border-b border-zinc-100 dark:border-zinc-900 cursor-pointer hover:bg-zinc-100 focus:bg-zinc-100 dark:hover:bg-zinc-900 dark:focus:bg-zinc-900 w-full h-full p-5">
                    <MoonIcon className="text-zinc-500 w-6 h-6 mr-2 float-left" />
                    <span className="text-zinc-500 dark:text-zinc-300">
                        Koyu Tema
                    </span>
                    <ChevronRightIcon className="text-brand w-6 h-6 float-right" />
                </div>
            )}
        </>
    );
}
