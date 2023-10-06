'use client';

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface InfoCardProps {
    className?: string;
    description: string;
    link: string;
}

export default function InfoCard({
    className,
    description,
    link,
}: InfoCardProps) {
    return (
        <>
            <div
                className={`${className} max-w-sm p-6 bg-zinc-50 rounded-lg dark:bg-zinc-950`}>
                <p className="mb-5 text-base text-zinc-900 dark:text-zinc-400">
                    {description}
                </p>
                <Link
                    href={link}
                    target="_blank"
                    className="inline-flex items-center text-blue-500 hover:text-blue-400">
                    Detaylı bilgi
                    <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1.5" />
                </Link>
            </div>
        </>
    );
}
