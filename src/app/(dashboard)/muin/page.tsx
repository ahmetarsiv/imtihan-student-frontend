'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { AppDispatch, useDispatch } from '@/store';
import { setTitle } from '@/store/slices/root';
import Link from 'next/link';
import { Button, Drawer, InfoCard } from '@codenteq/interfeys';
import LottieAnimation from '@/components/LottieAnimation';
import Muin from '../../../../public/lottie/Animation - 1712519369192.json';

export default function MuinPage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    useEffect(() => {
        dispatch(setTitle('Muin'));
    }, [dispatch]);

    return (
        <>
            <main className="flex gap-5">
                <InfoCard className="col-span-full">
                    <div className="flex flex-col lg:flex-row items-center lg:max-w-4xl h-auto border border-brand rounded-2xl p-5 ">
                        <div className="order-last lg:order-first">
                            <h3 className="text-2xl font-bold tracking-tight">
                                Merhaba ben Muin
                            </h3>
                            <p className="text-lg">
                                Sana yardım etmek için buradayım. En kısa sürede
                                tanışacağız!
                            </p>
                            <div className="pt-10">
                                <Button
                                    type={'button'}
                                    label={'Muin'}
                                    onClick={toggleDrawer}
                                />
                            </div>
                        </div>
                        <div className="h-72">
                            <LottieAnimation animationData={Muin} />
                        </div>
                    </div>
                </InfoCard>

                <aside className="bg-white dark:bg-black sm:hidden md:hidden lg:block xl:block 2xl:block hidden w-2/5 my-4">
                    <div className="flex flex-col gap-2">
                        <h3>Premium'a Abone Ol</h3>
                        <span>
                            Yeni özellikleri açmak için abone ol ve uygun olman
                            durumunda reklam geliri payı kazan.
                        </span>
                        <Link href={'/plan'}>
                            <Button
                                className="w-full"
                                type={'button'}
                                label={'Abone ol'}
                            />
                        </Link>
                    </div>
                </aside>
            </main>

            <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer}>
                <h2>Muin Zeki Yardımcın</h2>
                <p className="my-5">
                    Yapay zeka ile güçlendirilmiş bir öğrenme arkadaşı.
                </p>
                <ul className="my-5">
                    <li>Sorularınızı Sorun</li>
                    <li>Anında Çözüm Alın</li>
                    <li>Kişiselleştirilmiş İmtihan Deneyimi</li>
                    <li>Performans Analizi ve İyileştirme</li>
                </ul>
                <p className="my-5">
                    Muin ile tanışın ve eğitim hayatınıza bir adım önde
                    başlayın. İmtihanlar artık daha kolay ve keyifli! Başarılar
                    dileriz.
                </p>
                <Link href={'https://imtihantech.com/muin'} target="_blank">
                    <Button type={'button'} label={'Daha fazla'} />
                </Link>
            </Drawer>
        </>
    );
}
