'use client';

import Card from '@/components/cards/Card';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { ReactNode, useEffect, useState } from 'react';
import { getAnnouncements } from '@/store/slices/announcement';
import ViewModal from '@/app/(dashboard)/announcement/_forms/ViewModal';
import NoContentCard from '@/components/cards/NoContentCard';
import LottieAnimation from '@/components/LottieAnimation';
import Lottie from '../../../../public/lottie/animation_llpkgi2z.json';
import { IAnnouncementResponse } from '@/types/IAnnouncement';

export default function AnnouncementPage(): ReactNode {
    const { announcements, isLoading } = useSelector(
        state => state.announcement,
    );
    const dispatch: AppDispatch = useDispatch();
    const [openViewModal, setOpenViewModal] = useState<boolean>(false);
    const [id, setId] = useState<number | null>(null);

    useEffect(() => {
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
                                    key={key}
                                    time={new Date(
                                        announcement?.created_at,
                                    ).toLocaleString('tr-TR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                    })}
                                    badge={'Duyuru'}
                                    button={{
                                        name: 'Görüntüle',
                                        onClick: () =>
                                            handleView(announcement?.id),
                                    }}
                                    title={announcement?.name}>
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: announcement?.content,
                                        }}
                                    />
                                </Card>
                            ),
                        )
                    ) : (
                        <NoContentCard
                            className="col-span-full"
                            name="Henüz görülecek bir şey yok."
                            description="Şu anda sistemde yayınlanmış bir duyuru bulunmamaktadır.">
                            <div className="h-72">
                                <LottieAnimation animationData={Lottie} />
                            </div>
                        </NoContentCard>
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
