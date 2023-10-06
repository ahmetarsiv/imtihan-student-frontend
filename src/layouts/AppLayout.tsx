'use client';

import Sidebar from '@/layouts/Sidebar';
import { useAuth } from '@/hooks/auth';
import Header from '@/components/Header';
import MobileBar from '@/components/MobileBar';
import { Toaster } from 'react-hot-toast';
import BackButton from '@/components/BackButton';
import { ReactNode, useEffect, useState } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    const { user } = useAuth({ middleware: 'auth' });
    const [title, setTitle] = useState<string>('');

    useEffect(() => {
        setTitle(document?.title);
    }, []);

    return (
        <>
            {/* Page Heading */}
            <Header name={title} />

            <main className="md:flex">
                {/* Mobile Back-Button */}
                <BackButton />

                {/* Page Sidebar */}
                <Sidebar />

                {/* Page Content */}
                <div className="w-full min-h-screen bg-white dark:bg-black lg:px-4 px-2 py-16">
                    {children}
                </div>
            </main>

            {/* Mobile Menu */}
            <MobileBar />

            <Toaster position="top-right" />
        </>
    );
}
