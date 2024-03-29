'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import menuConfig, { IMenuItem } from '@/config/menu';

interface IMobileBarProps {
    className?: string;
}

export default function BottomNavigation({ className }: IMobileBarProps) {
    const path = usePathname();
    const menus = menuConfig.mobile;

    return (
        <nav className={`${className} bg-white dark:bg-black block lg:hidden`}>
            <ul className="flex justify-around list-none fixed bottom-0 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-black shadow w-full">
                {menus?.map((item: IMenuItem, index: number) => (
                    <Link href={item.path} key={index}>
                        <li
                            className={`${
                                path == item.path
                                    ? 'text-brand'
                                    : 'dark:text-white text-zinc-900'
                            } w-full text-center p-3`}>
                            {item.icon}
                        </li>
                    </Link>
                ))}
            </ul>
        </nav>
    );
}
