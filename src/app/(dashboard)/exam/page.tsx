'use client';

import React, { ReactNode, useEffect } from 'react';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { setTitle } from '@/store/slices/root';
import Image from 'next/image';
import Placeholder from '../../../../public/placeholder.png';
import { getExamTypes } from '@/store/slices/exam-type';
import { IExamTypeResponse } from '@/types/IExamType';
import { createExam } from '@/store/slices/exam';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Badge, Button, Card, InfoCard, Label } from '@codenteq/interfeys';
import LottieAnimation from '@/components/LottieAnimation';
import Lottie from '../../../../public/lottie/animation_llpjjjsc.json';

export default function ClassSchedulePage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();

    const { examTypes, isLoading } = useSelector(state => state.examType);

    useEffect(() => {
        dispatch(setTitle('İmtihanlar'));
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
            loading: 'İmtihan oluşturuluyor...',
            success: () => {
                router.push('/exam/test');
                return 'İmtihan oluşturuldu. Yönlendiriliyorsunuz...';
            },
            error: 'İmtihan oluşturulurken bir hata oluştu.',
        });
    };

    return (
        <>
            <main>
                <div className="flex items-center justify-end p-4">
                    <div className="w-full md:w-auto flex md:flex-row flex-col gap-2">
                        <Link href={'/exam/result'}>
                            <Button
                                className="w-full"
                                type={'button'}
                                label={'Sonuçlarım'}
                            />
                        </Link>
                        <Link href={'/exam/create'}>
                            <Button
                                className="w-full"
                                type={'button'}
                                label={'İmtihan ol'}
                            />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-2">
                    {isLoading ? (
                        <div
                            role="status"
                            className="w-full p-4 rounded animate-pulse">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="h-2.5 bg-zinc-300 rounded-full dark:bg-zinc-600 w-72 mb-2.5" />
                                    <div className="w-40 h-2 bg-zinc-200 rounded-full dark:bg-zinc-700 mb-2.5" />
                                    <div className="h-2.5 bg-zinc-300 rounded-full dark:bg-zinc-600 w-56" />
                                </div>
                            </div>
                        </div>
                    ) : examTypes.length > 0 ? (
                        examTypes?.map(
                            (examType: IExamTypeResponse, key: number) => (
                                <div
                                    className="cursor-pointer"
                                    key={key}
                                    onClick={() =>
                                        handleExamCreate(examType.id)
                                    }>
                                    <Card>
                                        <div>
                                            <Image
                                                className="rounded-lg mt-2"
                                                src={Placeholder}
                                                alt={'Placeholder'}
                                            />
                                        </div>
                                        <div className="my-2">
                                            <Badge name={examType.name} />
                                        </div>
                                        <div>
                                            <h3>Hazırlık Sınavı</h3>
                                            <Label>
                                                Temel Yeterlilik Sınavı ölçme ve
                                                değerlendirme.
                                            </Label>
                                        </div>
                                    </Card>
                                </div>
                            ),
                        )
                    ) : (
                        <InfoCard className="col-span-full">
                            <div className="flex flex-col lg:flex-row items-center lg:max-w-4xl h-auto border border-brand rounded-2xl p-5 ">
                                <div className="order-last lg:order-first">
                                    <h3 className="text-2xl font-bold tracking-tight">
                                        Henüz görülecek bir şey yok.
                                    </h3>
                                    <p className="text-lg">
                                        Şu anda sistemde yayınlanmış bir sınav
                                        bulunmamaktadır.
                                    </p>
                                </div>
                                <div className="h-72">
                                    <LottieAnimation animationData={Lottie} />
                                </div>
                            </div>
                        </InfoCard>
                    )}
                </div>
            </main>
        </>
    );
}
