'use client';

import NoContentCard from '@/components/cards/NoContentCard';

import React, { ReactNode, useEffect } from 'react';
import LottieAnimation from '@/components/LottieAnimation';
import Exam from '../../../../../public/lottie/animation_llpjjjsc.json';
import { AppDispatch, useDispatch } from '@/store';
import { setTitle } from '@/store/slices/root';
import NavLink from "@/components/NavLink";

export default function ResultPage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Sonuçlarım'));
    }, [dispatch]);

    return (
        <>
            <main>
                <div className="flex items-center justify-end p-4">
                    <div className="w-full md:w-auto">
                        <NavLink name="DEMO Detay" href="/exam/1/view"/>
                    </div>
                </div>

                <div>
                    <NoContentCard
                        className="col-span-full"
                        name="Henüz görülecek bir şey yok."
                        description="Şu anda sistemde yayınlanmış bir sınav sonucu bulunmamaktadır."
                    >
                        <div className="h-72">
                            <LottieAnimation animationData={Exam}/>
                        </div>
                    </NoContentCard>
                </div>
            </main>
        </>
    );
}
