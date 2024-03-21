'use client';

import React, { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { deleteSupport, getSupports } from '@/store/slices/support';
import { TrashIcon } from '@heroicons/react/24/outline';
import LottieAnimation from '@/components/LottieAnimation';
import Lottie from '../../../../public/lottie/animation_llpjb9vt.json';
import CreateModal from '@/app/(dashboard)/support/_forms/CreateModal';
import { setTitle } from '@/store/slices/root';
import { Button, Datatable, InfoCard } from '@codenteq/interfeys';

export default function SupportPage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();
    const [pagePaginate, setPagePaginate] = useState(1);
    const [search, setSearch] = useState('');
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const { supports, meta, isLoading } = useSelector(state => state.support);

    useEffect(() => {
        dispatch(setTitle('Destekler'));
        dispatch(getSupports(pagePaginate, search));
    }, [dispatch, pagePaginate, search]);

    const handleDelete = (id: number) => {
        confirm('Emin misin?') && dispatch(deleteSupport(id));
    };

    const columns = [
        {
            Header: 'Konu',
            accessor: 'subject',
        },
        {
            Header: 'Durum',
            accessor: 'is_active',
        },
        {
            Header: 'İşlemler',
            Cell: ({ row }: any) => (
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => handleDelete(row?.original?.id)}
                        className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300">
                        <TrashIcon className="h-5 w-5" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
            <main>
                {supports.length === 0 ? (
                    <InfoCard>
                        <div className="flex flex-col lg:flex-row items-center lg:max-w-4xl h-auto border border-brand rounded-2xl p-5 ">
                            <div className="order-last lg:order-first">
                                <h3 className="text-2xl font-bold tracking-tight">
                                    Henüz görülecek bir şey yok.
                                </h3>
                                <p className="text-lg">
                                    Şu anda sistemde yayınlanmış bir destek
                                    mesajı bulunmamaktadır.
                                </p>
                                <div className="pt-10">
                                    <Button
                                        onClick={() => setOpenCreateModal(true)}
                                        type={'button'}
                                        label={'Destek Oluştur'}
                                    />
                                </div>
                            </div>
                            <div className="h-72">
                                <LottieAnimation animationData={Lottie} />
                            </div>
                        </div>
                    </InfoCard>
                ) : (
                    <Datatable
                        columns={columns}
                        data={supports}
                        pagePaginate={pagePaginate}
                        setPagePaginate={setPagePaginate}
                        meta={meta}
                        isLoading={isLoading}
                        tableTopRightHeader={
                            <Button
                                onClick={() => setOpenCreateModal(true)}
                                className="w-full"
                                type={'button'}
                                label={'Oluştur'}
                            />
                        }
                        setSearch={setSearch}
                    />
                )}
                <CreateModal
                    open={openCreateModal}
                    setIsOpen={setOpenCreateModal}
                />
            </main>
        </>
    );
}
