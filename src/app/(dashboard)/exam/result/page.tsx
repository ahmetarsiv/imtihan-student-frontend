'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import LottieAnimation from '@/components/LottieAnimation';
import ExamResults from '../../../../../public/lottie/Animation - 1712518772284.json';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { setTitle } from '@/store/slices/root';
import Link from 'next/link';
import { Datatable, InfoCard } from '@codenteq/interfeys';
import { getExamResults } from '@/store/slices/exam-result';
import { EyeIcon } from '@heroicons/react/24/outline';
import moment from 'moment';

export default function ResultPage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();
    const [pagePaginate, setPagePaginate] = useState(1);
    const [search, setSearch] = useState('');

    const { examResults, meta, isLoading } = useSelector(
        state => state.examResult,
    );

    const columns = [
        {
            Header: 'Sınav',
            accessor: 'exam.exam_type.name',
        },
        {
            Header: 'Puan',
            accessor: 'point',
        },
        {
            Header: 'Sınav Oluşturulma Tarihi',
            accessor: 'created_at',
            Cell: ({ value }: any) =>
                moment(value).format('d MMM yyyy HH:mm').toString(),
        },
        {
            Header: 'İşlemler',
            Cell: ({ row }: any) => (
                <div className="flex items-center space-x-2">
                    <Link href={`/exam/${row.original.exam_id}/view`}>
                        <button className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300">
                            <EyeIcon className="h-5 w-5" />
                        </button>
                    </Link>
                </div>
            ),
        },
    ];

    useEffect(() => {
        dispatch(setTitle('Sonuçlarım'));
        dispatch(getExamResults());
    }, [dispatch, pagePaginate, search]);

    return (
        <>
            {examResults.length == 0 ? (
                <InfoCard className="col-span-full">
                    <div className="flex flex-col lg:flex-row items-center lg:max-w-4xl h-auto border border-brand rounded-2xl p-5 ">
                        <div className="order-last lg:order-first">
                            <h3 className="text-2xl font-bold tracking-tight">
                                Henüz görülecek bir şey yok.
                            </h3>
                            <p className="text-lg">
                                Şu anda sistemde yayınlanmış bir sınav sonucu
                                bulunmamaktadır.
                            </p>
                        </div>
                        <div className="h-72">
                            <LottieAnimation animationData={ExamResults} />
                        </div>
                    </div>
                </InfoCard>
            ) : (
                <Datatable
                    columns={columns}
                    data={examResults}
                    pagePaginate={pagePaginate}
                    setPagePaginate={setPagePaginate}
                    meta={meta}
                    isLoading={isLoading}
                    setSearch={setSearch}
                />
            )}
        </>
    );
}
