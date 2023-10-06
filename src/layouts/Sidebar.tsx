'use client';

import Avatar from '@/components/Avatar';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth';
import { usePathname } from 'next/navigation';
import menuConfig, { IMenuItem } from '@/config/menu';

interface SidebarProps {
    className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
    const { logout } = useAuth();

    const path = usePathname();

    const menus = menuConfig.desktop;

    return (
        <aside
            className={`${className} text-zinc-900 dark:text-zinc-300 border-r border-zinc-100 dark:border-zinc-900 drop-shadow-sm bg-white dark:bg-black hidden lg:block w-72 z-10`}>
            <Avatar className={'my-4'} />
            <ul className="text-lg">
                {menus?.map((item: IMenuItem, index: number) => (
                    <Link href={item.path} key={index}>
                        <li
                            className={`${
                                path == item.path ? 'text-brand' : ''
                            } flex items-center p-5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg`}>
                            {item.icon}
                            <label className="cursor-pointer mx-2">
                                {item.name}
                            </label>
                        </li>
                    </Link>
                ))}
                <li
                    onClick={logout}
                    className="flex cursor-pointer items-center p-5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg">
                    <ArrowLeftOnRectangleIcon className="inline-block w-6 h-6" />
                    <label className="cursor-pointer mx-2">Oturumu Kapat</label>
                </li>
            </ul>
        </aside>
    );
}
