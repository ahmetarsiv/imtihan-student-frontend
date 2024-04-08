'use client';

import { AppDispatch, useDispatch, useSelector } from '@/store';
import React, { ReactNode, useEffect, useState } from 'react';
import { getAnnouncements } from '@/store/slices/announcement';
import ViewModal from '@/app/(dashboard)/announcement/_forms/ViewModal';
import LottieAnimation from '@/components/LottieAnimation';
import Lottie from '../../../../public/lottie/animation_llpkgi2z.json';
import { IAnnouncementResponse } from '@/types/IAnnouncement';
import { setTitle } from '@/store/slices/root';
import { Badge, Card, InfoCard } from '@codenteq/interfeys';
import Image from 'next/image';
import createImageUrl from '@/lib/image';

export default function AnnouncementPage(): ReactNode {
    const { announcements, isLoading } = useSelector(
        state => state.announcement,
    );
    const dispatch: AppDispatch = useDispatch();
    const [openViewModal, setOpenViewModal] = useState<boolean>(false);
    const [id, setId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(setTitle('Duyurular'));
        dispatch(getAnnouncements());
    }, [dispatch]);

    const handleView = (id: number) => {
        setOpenViewModal(true);
        setId(id);
    };

    return (
        <>
            <main>
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
                    ) : announcements.length > 0 ? (
                        announcements.map(
                            (
                                announcement: IAnnouncementResponse,
                                key: number,
                            ) => (
                                <Card
                                    className="announcement-card"
                                    key={key}
                                    actions={[
                                        <button
                                            id="view"
                                            key={key}
                                            onClick={() =>
                                                handleView(announcement?.id)
                                            }>
                                            Görüntüle
                                        </button>,
                                    ]}>
                                    <div className="aspect-auto">
                                        <div>
                                            <Image
                                                className="rounded-lg mt-2"
                                                src={createImageUrl(
                                                    announcement?.src,
                                                )}
                                                width={670}
                                                height={236}
                                                alt={announcement?.name}
                                            />
                                        </div>
                                        <div className="my-2">
                                            <Badge className="bg-indigo-100 text-indigo-800 text-xs">
                                                {new Date(
                                                    announcement?.created_at,
                                                ).toLocaleString('tr-TR', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                })}
                                            </Badge>
                                        </div>
                                        <div>
                                            <h3>
                                                {announcement?.name.slice(
                                                    0,
                                                    35,
                                                )}
                                            </h3>
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: announcement?.content
                                                        ? announcement.content.slice(
                                                              0,
                                                              50,
                                                          )
                                                        : '',
                                                }}
                                            />
                                        </div>
                                    </div>
                                </Card>
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
                                        Şu anda sistemde yayınlanmış bir duyuru
                                        bulunmamaktadır.
                                    </p>
                                </div>
                                <div className="h-72">
                                    <LottieAnimation animationData={Lottie} />
                                </div>
                            </div>
                        </InfoCard>
                    )}

                    <ViewModal
                        open={openViewModal}
                        setIsOpen={setOpenViewModal}
                        id={id}
                    />
                </div>
            </main>
        </>
    );
}
