'use client';

import { AppDispatch, useDispatch, useSelector } from '@/store';
import React, { ReactNode, useEffect } from 'react';
import { getClassSchedule } from '@/store/slices/class-schedule';
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
    const { classSchedule, isLoading } = useSelector(
        state => state.classSchedule,
    );

    useEffect(() => {
        if (id) {
            dispatch(getClassSchedule(id));
        }
    }, [dispatch, id]);

    return (
        <>
            {open && classSchedule && (
                <Modal
                    title={classSchedule?.name}
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
                                <div className="flex ">
                                    <Badge className="my-2 bg-indigo-100 text-indigo-800 text-xs">
                                        {new Date(
                                            classSchedule?.start_date,
                                        ).toLocaleString('tr-TR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                        })}
                                    </Badge>
                                    <Badge className="my-2 bg-indigo-100 text-indigo-800 text-xs">
                                        {new Date(
                                            classSchedule?.end_date,
                                        ).toLocaleString('tr-TR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                        })}
                                    </Badge>
                                </div>
                                <h3>{classSchedule.name}</h3>
                                <p>{classSchedule.description}</p>
                            </>
                        )}
                    </div>
                </Modal>
            )}
        </>
    );
}
