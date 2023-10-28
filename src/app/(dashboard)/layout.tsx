'use client';

import React, { ReactNode, useEffect } from 'react';
import AppLayout from '@/layouts/AppLayout';
import { useAuth } from '@/hooks/auth';
import { usePathname, useRouter } from 'next/navigation';
import Lottie from '../../../public/lottie/imtihan.json';
import LottieAnimation from '@/components/LottieAnimation';

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

    if (user) {
        return pathname === '/exam/test' ? (
            <> {props.children} </>
        ) : (
            <AppLayout>{props.children}</AppLayout>
        );
    }

    return (
        <div className="flex h-screen w-screen m-auto justify-center items-center">
            <div className="w-72 h-72">
                <LottieAnimation animationData={Lottie} />
            </div>
        </div>
    );
}
