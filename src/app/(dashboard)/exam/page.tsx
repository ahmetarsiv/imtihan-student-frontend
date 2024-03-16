'use client';

import React, { ReactNode, useEffect } from 'react';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { setTitle } from '@/store/slices/root';
import NavLink from '@/components/NavLink';
import Card from '@/components/cards/Card';
import Image from 'next/image';
import Placeholder from '../../../../public/placeholder.jpg';
import { getExamTypes } from '@/store/slices/exam-type';
import { IExamTypeResponse } from '@/types/IExamType';
import { createExam } from '@/store/slices/exam';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ClassSchedulePage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();

    const { examTypes, isLoading } = useSelector(state => state.examType);

    useEffect(() => {
        dispatch(setTitle('Sınavlar'));
        dispatch(getExamTypes());
    }, [dispatch]);

    const handleExamCreate = (id: number) => {
        const res = dispatch(
            createExam({
                type: 'normal',
                id,
            }),
        );

        toast.promise(res, {
            loading: 'Sınav oluşturuluyor...',
            success: () => {
                router.push('/exam/test');
                return 'Sınav oluşturuldu. Yönlendiriliyorsunuz...';
            },
            error: 'Sınav oluşturulurken bir hata oluştu.',
        });
    };

    return (
        <>
            <main>
                <div className="flex items-center justify-end p-4">
                    <div className="w-full md:w-auto flex md:flex-row flex-col gap-2">
                        <NavLink name="Sonuçlarım" href="/exam/result" />
                        <NavLink name="Test Çöz" href="/exam/create" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-2">
                    {examTypes?.map(
                        (examType: IExamTypeResponse, key: number) => (
                            <div
                                key={key}
                                onClick={() => handleExamCreate(examType.id)}>
                                <Card
                                    time={Date()}
                                    badge={'TYT'}
                                    title={'Hazırlık Sınavı'}>
                                    <span>
                                        Temel Yeterlilik Sınavı ölçme ve
                                        değerlendirme.
                                    </span>
                                    <Image
                                        className="rounded-lg mt-2"
                                        src={Placeholder}
                                        alt={'Placeholder'}
                                    />
                                </Card>
                            </div>
                        ),
                    )}
                </div>
            </main>
        </>
    );
}
