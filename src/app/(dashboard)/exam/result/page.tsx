'use client';

import React, { ReactNode, useEffect } from 'react';
import LottieAnimation from '@/components/LottieAnimation';
import Exam from '../../../../../public/lottie/animation_llpjjjsc.json';
import { AppDispatch, useDispatch } from '@/store';
import { setTitle } from '@/store/slices/root';
import Link from 'next/link';
import { Button, InfoCard } from '@codenteq/interfeys';

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
                        <Link href="/exam/1/view">
                            <Button
                                className="w-full"
                                type={'button'}
                                label={'Demo Detay'}
                            />
                        </Link>
                    </div>
                </div>

                <div>
                    <InfoCard className="col-span-full">
                        <div className="flex flex-col lg:flex-row items-center lg:max-w-4xl h-auto border border-brand rounded-2xl p-5 ">
                            <div className="order-last lg:order-first">
                                <h3 className="text-2xl font-bold tracking-tight">
                                    Henüz görülecek bir şey yok.
                                </h3>
                                <p className="text-lg">
                                    Şu anda sistemde yayınlanmış bir sınav
                                    sonucu bulunmamaktadır.
                                </p>
                            </div>
                            <div className="h-72">
                                <LottieAnimation animationData={Exam} />
                            </div>
                        </div>
                    </InfoCard>
                </div>
            </main>
        </>
    );
}
