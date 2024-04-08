'use client';

import { AppDispatch, useDispatch, useSelector } from '@/store';
import React, { ReactNode, useEffect } from 'react';
import { getSupport } from '@/store/slices/support';
import { Badge, Modal } from '@codenteq/interfeys';

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
    const { support, isLoading } = useSelector(state => state.support);

    useEffect(() => {
        if (id) {
            dispatch(getSupport(id));
        }
    }, [dispatch, id]);

    return (
        <>
            {open && support && (
                <Modal
                    title={support?.subject}
                    isOpen={open}
                    setIsOpen={setIsOpen}>
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
                                <Badge className="my-2 bg-indigo-100 text-indigo-800 text-xs">
                                    {new Date(
                                        support?.created_at,
                                    ).toLocaleString('tr-TR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                    })}
                                </Badge>

                                <h1 className="mb-4 text-3xl font-extrabold md:text-3xl lg:text-4xl text-zinc-900 dark:text-zinc-200">
                                    {support?.subject}
                                </h1>

                                <p className="text-zinc-500 dark:text-zinc-400">
                                    {support?.message}
                                </p>
                            </>
                        )}
                    </div>
                </Modal>
            )}
        </>
    );
}
