'use client';

import React, { ReactNode, useEffect } from 'react';
import AppLayout from '@/layouts/AppLayout';
import { useAuth } from '@/hooks/auth';
import { usePathname, useRouter } from 'next/navigation';
import Lottie from '../../../public/lottie/imtihan.json';
import LottieAnimation from '@/components/LottieAnimation';
import ApplicationLogo from '@/components/ApplicationLogo';

export default function DashboardLayout(props: { children: ReactNode }) {
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setTimeout(() => {
            if (!user) {
                router.push('/auth/login');
            }
        }, 2000);
    }, []);

    if (user && !user?.is_active) {
        router.push('/auth/wait-list');
    }

    if (user && user?.is_active) {
        return pathname === '/exam/test' ? (
            <> {props.children} </>
        ) : (
            <AppLayout>{props.children}</AppLayout>
        );
    }

    return (
        <div className="flex flex-col h-screen w-screen m-auto justify-center items-center">
            <div>
                <ApplicationLogo width={144} height={32} />
            </div>
            <div className="absolute bottom-0 w-72 h-72">
                <LottieAnimation animationData={Lottie} />
            </div>
        </div>
    );
}
