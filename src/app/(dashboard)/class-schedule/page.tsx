'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import {
    deleteClassSchedule,
    getClassSchedules,
} from '@/store/slices/class-schedule';
import Lottie from '../../../../public/lottie/animation_llpjqp34.json';
import LottieAnimation from '@/components/LottieAnimation';
import { IClassScheduleResponse } from '@/types/IClassSchedule';
import { setTitle } from '@/store/slices/root';
import { Button, Card, InfoCard } from '@codenteq/interfeys';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import CreateModal from '@/app/(dashboard)/class-schedule/_forms/CreateModal';
import EditModal from '@/app/(dashboard)/class-schedule/_forms/EditModal';
import ViewModal from '@/app/(dashboard)/class-schedule/_forms/ViewModal';

export default function ClassSchedulePage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [openViewModal, setOpenViewModal] = useState<boolean>(false);
    const [id, setId] = useState<number | null>(null);
    const { classSchedules, isLoading } = useSelector(
        state => state.classSchedule,
    );

    console.log(classSchedules);

    useEffect(() => {
        dispatch(setTitle('Ders Programı'));
        dispatch(getClassSchedules());
    }, [dispatch]);
    1;
    const handleDelete = (id: number) => {
        if (confirm('Emin misiniz?')) {
            dispatch(deleteClassSchedule(id));
        }
    };

    const handleEdit = (id: number) => {
        setOpenEditModal(true);
        setId(id);
    };

    const handleView = (id: number) => {
        setOpenViewModal(true);
        setId(id);
    };

    return (
        <>
            <main>
                <div className="flex items-center justify-end p-4">
                    <div className="w-full md:w-auto flex md:flex-row flex-col gap-2">
                        <Button
                            className="w-full"
                            type={'button'}
                            label={'Oluştur'}
                            onClick={() => setOpenCreateModal(true)}
                        />
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
                    ) : classSchedules.length > 0 ? (
                        classSchedules.map(
                            (
                                classSchedule: IClassScheduleResponse,
                                key: number,
                            ) => (
                                <Card
                                    className="classSchedule-card"
                                    key={key}
                                    actions={[
                                        <button
                                            id="view"
                                            key={key}
                                            onClick={() =>
                                                handleView(classSchedule?.id)
                                            }>
                                            Görüntüle
                                        </button>,
                                        <button
                                            id="edit"
                                            key={key}
                                            onClick={() =>
                                                handleEdit(classSchedule?.id)
                                            }>
                                            Düzenle
                                        </button>,
                                        <button
                                            id="remove"
                                            key={key}
                                            onClick={() =>
                                                handleDelete(classSchedule?.id)
                                            }>
                                            Kaldır
                                        </button>,
                                    ]}>
                                    <div className="p-4">
                                        <div className="flex items-center">
                                            <div className="w-16 h-16 mr-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg flex items-center justify-center">
                                                <CalendarDaysIcon className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold">
                                                    {classSchedule?.name.slice(
                                                        0,
                                                        35,
                                                    )}
                                                </h3>
                                                <p className="text-zinc-600">
                                                    {classSchedule?.description
                                                        ? classSchedule.description.slice(
                                                              0,
                                                              50,
                                                          )
                                                        : ''}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-zinc-500">
                                                Başlangıç Tarihi:{' '}
                                                {classSchedule?.start_date
                                                    ? new Date(
                                                          classSchedule.start_date,
                                                      ).toLocaleString(
                                                          'tr-TR',
                                                          {
                                                              year: 'numeric',
                                                              month: 'long',
                                                              day: 'numeric',
                                                              hour: '2-digit',
                                                              minute: '2-digit',
                                                          },
                                                      )
                                                    : ''}
                                            </p>
                                            <p className="text-zinc-500">
                                                Bitiş Tarihi:{' '}
                                                {classSchedule?.end_date
                                                    ? new Date(
                                                          classSchedule.end_date,
                                                      ).toLocaleString(
                                                          'tr-TR',
                                                          {
                                                              year: 'numeric',
                                                              month: 'long',
                                                              day: 'numeric',
                                                              hour: '2-digit',
                                                              minute: '2-digit',
                                                          },
                                                      )
                                                    : ''}
                                            </p>
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
                                        Hadi ders programınızı oluşturalım.
                                    </h3>
                                    <p className="text-lg">
                                        Ders prgoramınızı oluşturarak tarihi,
                                        zamanı ve dersi belirleyin.
                                    </p>
                                    <div className="pt-10">
                                        <Button
                                            type={'button'}
                                            label={'Program Oluştur'}
                                            onClick={() =>
                                                setOpenCreateModal(true)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="h-72">
                                    <LottieAnimation animationData={Lottie} />
                                </div>
                            </div>
                        </InfoCard>
                    )}
                </div>
                <CreateModal
                    open={openCreateModal}
                    setIsOpen={setOpenCreateModal}
                />
                <ViewModal
                    open={openViewModal}
                    setIsOpen={setOpenViewModal}
                    id={id}
                />
                {id && (
                    <EditModal
                        open={openEditModal}
                        setIsOpen={setOpenEditModal}
                        id={id}
                    />
                )}
            </main>
        </>
    );
}
