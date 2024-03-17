'use client';

import React, { ReactNode, useEffect } from 'react';
import LottieAnimation from '@/components/LottieAnimation';
import Lottie from '../../../../public/lottie/animation_llpkgi2z.json';
import { AppDispatch, useDispatch } from '@/store';
import { setTitle } from '@/store/slices/root';
import { InfoCard } from '@codenteq/interfeys';

export default function NotificationPage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Bildirimler'));
    }, [dispatch]);
    return (
        <>
            <main>
                <InfoCard className="!max-w-full !bg-white dark:!bg-black col-span-full">
                    <div className="flex flex-col lg:flex-row items-center lg:max-w-4xl h-auto border border-brand rounded-2xl p-5 ">
                        <div className="order-last lg:order-first">
                            <h3 className="text-2xl font-bold tracking-tight">
                                Henüz görülecek bir şey yok.
                            </h3>
                            <p className="text-lg">
                                Şu anda sistemde yayınlanmış bir bildirim
                                bulunmamaktadır.
                            </p>
                        </div>
                        <div className="h-72">
                            <LottieAnimation animationData={Lottie} />
                        </div>
                    </div>
                </InfoCard>
            </main>
        </>
    );
}
