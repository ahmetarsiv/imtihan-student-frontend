'use client';

import React, { ReactNode, useEffect } from 'react';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { deleteNote, getNotes } from '@/store/slices/note';
import Card from '@/components/cards/Card';
import Lottie from '../../../../public/lottie/animation_llpiacni.json';
import NoContentCard from '@/components/cards/NoContentCard';
import LottieAnimation from '@/components/LottieAnimation';
import { INoteResponse } from '@/types/INote';
import NavLink from '@/components/NavLink';
import { setTitle } from '@/store/slices/root';

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
                    <div className="w-full md:w-auto flex flex-col">
                        <NavLink name="Oluştur" href="/note/create" />
                        <NavLink name="Akış" href="/note/flow" />
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
                                time={new Date(note?.created_at).toLocaleString(
                                    'tr-TR',
                                    {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                    },
                                )}
                                badge={
                                    note?.is_everyone == true
                                        ? 'Herkes'
                                        : 'Sadece Ben'
                                }
                                link={{
                                    name: 'Görüntüle',
                                    href: '/note/' + note?.id + '/view',
                                }}
                                button={{
                                    name: 'Sil',
                                    onClick: () => handleDelete(note?.id),
                                }}
                                title={note?.name}>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: note?.content,
                                    }}
                                />
                            </Card>
                        ))
                    ) : (
                        <NoContentCard
                            className="col-span-full"
                            name="Hadi ilk notunuzu oluşturalım."
                            description="Sınırsız defter, notlarınızı alın ve arkadaşlarınız ile paylaşın."
                            link={{
                                name: 'Not Oluştur',
                                href: '/note/create',
                            }}>
                            <div className="h-72">
                                <LottieAnimation animationData={Lottie} />
                            </div>
                        </NoContentCard>
                    )}
                </div>
            </main>
        </>
    );
}
