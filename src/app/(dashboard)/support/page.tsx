'use client';

import React, { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import Datatable from '@/components/table/Datatable';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { deleteSupport, getSupports } from '@/store/slices/support';
import { TrashIcon } from '@heroicons/react/24/outline';
import NoContentCard from '@/components/cards/NoContentCard';
import LottieAnimation from '@/components/LottieAnimation';
import Lottie from '../../../../public/lottie/animation_llpjb9vt.json';
import CreateModal from '@/app/(dashboard)/support/_forms/CreateModal';

export default function SupportPage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();
    const [pagePaginate, setPagePaginate] = useState(1);
    const [search, setSearch] = useState('');
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const { supports, meta, isLoading } = useSelector(state => state.support);

    useEffect(() => {
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
            Cell: ({ row }) => (
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
                    <NoContentCard
                        className="col-span-full"
                        name="Henüz görülecek bir şey yok."
                        description="Şu anda sistemde yayınlanmış bir destek mesajı bulunmamaktadır."
                        button={{
                            name: 'Destek Oluştur',
                            onClick: () => setOpenCreateModal(true),
                        }}>
                        <div className="h-72">
                            <LottieAnimation animationData={Lottie} />
                        </div>
                    </NoContentCard>
                ) : (
                    <Datatable
                        columns={columns}
                        data={supports}
                        pagePaginate={pagePaginate}
                        setPagePaginate={setPagePaginate}
                        meta={meta}
                        isLoading={isLoading}
                        button={{
                            name: 'Oluştur',
                            onClick: () => setOpenCreateModal(true),
                        }}
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
