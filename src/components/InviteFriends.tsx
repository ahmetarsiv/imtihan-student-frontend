'use client';

import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function InviteFriends() {
    return (
        <div className="flex items-center justify-between h-32 w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-950">
            <div className="flex flex-col justify-center h-full p-4">
                <h2 className="text-xl dark:text-white">
                    Arkadaşını{' '}
                    <span className="font-bold text-brand">imtihan</span>'a
                    davet et, kazan!
                </h2>
            </div>
            <a
                href="https://open.imtihan.tech/auth/register"
                className="flex items-center justify-center h-full bg-brand p-4">
                <ChevronRightIcon className="text-white w-6 h-6" />
            </a>
        </div>
    );
}
