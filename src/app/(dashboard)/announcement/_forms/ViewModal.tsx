'use client';

import { AppDispatch, useDispatch, useSelector } from '@/store';
import { ReactNode, useEffect } from 'react';
import { getAnnouncement } from '@/store/slices/announcement';
import Image from 'next/image';
import createImageUrl from '@/lib/image';
import { Modal } from '@codenteq/interfeys';

interface IViewModalProps {
    open: boolean;
    // eslint-disable-next-line no-unused-vars
    setIsOpen(value: boolean): void;
    id: number | null;
}

export default function ViewModal({
    open,
    setIsOpen,
    id,
}: IViewModalProps): ReactNode {
    const dispatch: AppDispatch = useDispatch();
    const { announcement, isLoading } = useSelector(
        state => state.announcement,
    );

    useEffect(() => {
        if (id) {
            dispatch(getAnnouncement(id));
        }
    }, [dispatch, id]);

    return (
        <>
            {open && announcement && (
                <Modal title="Görüntüle" isOpen={open} setIsOpen={setIsOpen}>
                    <div className="bg-white p-8 dark:bg-black">
                        {isLoading ? (
                            <div
                                role="status"
                                className="max-w-sm animate-pulse">
                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
                            </div>
                        ) : (
                            <>
                                <Image
                                    src={createImageUrl(announcement?.src)}
                                    width={670}
                                    height={236}
                                    alt={announcement?.name}
                                    className="max-w-full h-auto rounded-lg duration-300 filter grayscale hover:grayscale-0"
                                />

                                <h1 className="mb-4 text-3xl font-extrabold md:text-3xl lg:text-4xl text-zinc-900 dark:text-zinc-200">
                                    {announcement?.name}
                                </h1>

                                <p
                                    className="text-zinc-500 dark:text-zinc-400"
                                    dangerouslySetInnerHTML={{
                                        __html: announcement?.content,
                                    }}
                                />
                            </>
                        )}
                    </div>
                </Modal>
            )}
        </>
    );
}
