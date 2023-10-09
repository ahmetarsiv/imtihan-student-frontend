'use client';

import { ReactNode } from 'react';

interface IGuestLayoutProps {
    children: ReactNode;
}

export default function GuestLayout({ children }: IGuestLayoutProps) {
    return (
        <>
            <main className="grid justify-items-center bg-white overflow-hidden dark:bg-black min-h-screen">
                {children}
            </main>
        </>
    );
}
