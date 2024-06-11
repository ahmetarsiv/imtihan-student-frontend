'use client';

import { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { usePathname, useSearchParams } from 'next/navigation';

const Progress = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const handleStart = () => {
            NProgress.start();
        };
        const handleStop = () => {
            NProgress.done();
        };

        handleStart();
        handleStop();

        return () => {
            handleStop();
        };
    }, [pathname, searchParams]);

    return (
        <style jsx global>{`
            #nprogress .bar {
                z-index: 50;
                width: 100%;
                height: 0.25rem;
                background: #0c6ba8;
            }
        `}</style>
    );
};

export default Progress;
