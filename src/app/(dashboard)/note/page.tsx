'use client';

import React, { ReactNode, useEffect } from 'react';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { deleteNote, getNotes } from '@/store/slices/note';
import Lottie from '../../../../public/lottie/animation_llpiacni.json';
import LottieAnimation from '@/components/LottieAnimation';
import { INoteResponse } from '@/types/INote';
import { setTitle } from '@/store/slices/root';
import Link from 'next/link';
import { Badge, Button, Card, InfoCard } from '@codenteq/interfeys';
import Image from 'next/image';
import Placeholder from '../../../../public/placeholder.jpg';

export default function NotePage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();
    const { notes, isLoading } = useSelector(state => state.note);

    useEffect(() => {
        dispatch(setTitle('Notlar'));
        dispatch(getNotes());
    }, [dispatch]);

    const handleDelete = (id: number) => {
        if (confirm('Emin misiniz?')) {
            dispatch(deleteNote(id));
        }
    };

    return (
        <>
            <main>
                <div className="flex items-center justify-end p-4">
                    <div className="w-full md:w-auto flex md:flex-row flex-col gap-2">
                        <Link href={'/note/create'}>
                            <Button
                                className="w-full"
                                type={'button'}
                                label={'Oluştur'}
                            />
                        </Link>
                        <Link href={'/note/flow'}>
                            <Button
                                className="w-full"
                                type={'button'}
                                label={'Akış'}
                            />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-1">
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
                    ) : notes.length > 0 ? (
                        notes.map((note: INoteResponse, key: number) => (
                            <Card
                                key={key}
                                actions={[
                                    <>
                                        <Link
                                            href={
                                                '/note/' + note?.id + '/view'
                                            }>
                                            Görüntüle
                                        </Link>
                                    </>,
                                    <>
                                        <div
                                            onClick={() =>
                                                handleDelete(note?.id)
                                            }>
                                            Kaldır
                                        </div>
                                    </>,
                                ]}>
                                <div>
                                    <Image
                                        className="rounded-lg mt-2"
                                        src={Placeholder}
                                        alt={'Placeholder'}
                                    />
                                </div>
                                <div className="my-2">
                                    <Badge
                                        name={
                                            note?.is_everyone == true
                                                ? 'Herkes'
                                                : 'Sadece Ben'
                                        }
                                    />
                                </div>
                                <div>
                                    <h3>{note?.name}</h3>
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: note?.content,
                                        }}
                                    />
                                </div>
                            </Card>
                        ))
                    ) : (
                        <InfoCard className="!max-w-full !bg-white dark:!bg-black col-span-full">
                            <div className="flex flex-col lg:flex-row items-center lg:max-w-4xl h-auto border border-brand rounded-2xl p-5 ">
                                <div className="order-last lg:order-first">
                                    <h3 className="text-2xl font-bold tracking-tight">
                                        Hadi ilk notunuzu oluşturalım.
                                    </h3>
                                    <p className="text-lg">
                                        Sınırsız defter, notlarınızı alın ve
                                        arkadaşlarınız ile paylaşın.
                                    </p>
                                    <div className="pt-10">
                                        <Link href={'/note/create'}>
                                            <Button
                                                type={'button'}
                                                label={'Not Oluştur'}
                                            />
                                        </Link>
                                    </div>
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
