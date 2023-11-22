'use client';

import { ReactNode, useEffect } from 'react';
import LottieAnimation from '@/components/LottieAnimation';
import Lottie from '../../../../public/lottie/animation_llpkgi2z.json';
import NoContentCard from '@/components/cards/NoContentCard';
import { AppDispatch, useDispatch } from '@/store';
import { setTitle } from '@/store/slices/root';

export default function NotificationPage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Bildirimler'));
    }, [dispatch]);
    return (
        <>
            <main>
                <NoContentCard
                    className="col-span-full"
                    name="Henüz görülecek bir şey yok."
                    description="Şu anda sistemde yayınlanmış bir bildirim bulunmamaktadır.">
                    <div className="h-72">
                        <LottieAnimation animationData={Lottie} />
                    </div>
                </NoContentCard>

                <div className="grid grid-cols-1 gap-1">
                    <div className="flex border-b border-zinc-100 dark:border-zinc-900 p-3">
                        <span className="text-zinc-500 dark:text-zinc-300">
                            Henüz görülecek bir şey yok.
                        </span>
                    </div>
                </div>
            </main>
        </>
    );
}
