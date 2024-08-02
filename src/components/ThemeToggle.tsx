'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
    MoonIcon,
    SunIcon,
    ComputerDesktopIcon,
} from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (!theme) {
            setTheme('light');
        }
    }, [theme]);

    if (!mounted) return null;

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else if (theme === 'dark') {
            setTheme('system');
        } else {
            setTheme('light');
        }
    };

    return (
        <div
            onClick={toggleTheme}
            className="border-b border-zinc-100 dark:border-zinc-900 cursor-pointer hover:bg-zinc-100 focus:bg-zinc-100 dark:hover:bg-zinc-900 dark:focus:bg-zinc-900 w-full h-full p-5 flex items-center">
            {theme === 'light' && (
                <>
                    <SunIcon className="text-amber-500 w-6 h-6 mr-2" />
                    <span className="text-zinc-500 dark:text-zinc-300">
                        Açık Tema
                    </span>
                </>
            )}
            {theme === 'dark' && (
                <>
                    <MoonIcon className="text-zinc-500 w-6 h-6 mr-2" />
                    <span className="text-zinc-500 dark:text-zinc-300">
                        Koyu Tema
                    </span>
                </>
            )}
            {theme === 'system' && (
                <>
                    <ComputerDesktopIcon className="text-zinc-500 w-6 h-6 mr-2" />
                    <span className="text-zinc-500 dark:text-zinc-300">
                        Cihaz Varsayılanı
                    </span>
                </>
            )}
            <ChevronRightIcon className="text-brand w-6 h-6 ml-auto" />
        </div>
    );
}
