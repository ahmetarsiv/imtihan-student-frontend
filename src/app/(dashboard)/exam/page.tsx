'use client';

import React, { ReactNode, useEffect } from 'react';
import { AppDispatch, useDispatch } from '@/store';
import { setTitle } from '@/store/slices/root';
import NavLink from "@/components/NavLink";
import Card from "@/components/cards/Card";
import Image from "next/image";
import Placeholder from '../../../../public/placeholder.jpg';

export default function ClassSchedulePage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Sınavlar'));
    }, [dispatch]);

    return (
        <>
            <main>
                <div className="flex items-center justify-end p-4">
                    <div className="w-full md:w-auto flex md:flex-row flex-col gap-2">
                        <NavLink name="Sonuçlarım" href="/exam/result"/>
                        <NavLink name="Test Çöz" href="/exam/create"/>
                    </div>
                </div>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-2">
                    <Card time={Date()} badge={'TYT'} title={'Hazırlık Sınavı'}>
                        <span>Temel Yeterlilik Sınavı ölçme ve değerlendirme.</span>
                        <Image className="rounded-lg mt-2" src={Placeholder} alt={'Placeholder'}/>
                    </Card>

                    <Card time={Date()} badge={'YDS'} title={'Dil Geliştirme'}>
                        <span>Yabancı Dil Sınavı ölçme değerlendirme.</span>
                        <Image className="rounded-lg mt-2" src={Placeholder} alt={'Placeholder'}/>
                    </Card>

                    <Card time={Date()} badge={'AYT'} title={'Hazırlık Sınavı'}>
                        <span>Alan Yeterlilik Testi ölçme ve değerlendirme.</span>
                        <Image className="rounded-lg mt-2" src={Placeholder} alt={'Placeholder'}/>
                    </Card>
                </div>
            </main>
        </>
    );
}
