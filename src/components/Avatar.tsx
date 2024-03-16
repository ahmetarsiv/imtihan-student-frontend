'use client';

import { useAuth } from '@/hooks/auth';
import Image from 'next/image';
import createImageUrl from '@/lib/image';

interface IAvatarProps {
    className?: string;
}

export default function Avatar({ className }: IAvatarProps) {
    const { user } = useAuth();

    const userSplit = user?.full_name
        .split(' ')
        .map(name => name[0])
        .join('');

    return (
        <>
            {user?.avatar ? (
                <div className={`${className} flex flex-col items-center`}>
                    <div className="inline-flex overflow-hidden relative justify-center items-center w-12 h-12 bg-zinc-200 rounded-full dark:bg-zinc-600">
                        <Image
                            src={createImageUrl(user?.avatar)}
                            alt={user?.full_name}
                            width={48}
                            height={48}
                        />
                    </div>
                    <span className="font-medium block text-lg my-2">
                        {user?.full_name}
                    </span>
                </div>
            ) : (
                <div className={`${className} flex flex-col items-center`}>
                    <div className="inline-flex overflow-hidden relative justify-center items-center w-12 h-12 bg-zinc-200 rounded-full dark:bg-zinc-600">
                        <span className="font-medium text-zinc-600 dark:text-zinc-300">
                            {userSplit}
                        </span>
                    </div>
                    <span className="font-medium block text-lg my-2">
                        {user?.full_name}
                    </span>
                </div>
            )}
        </>
    );
}
