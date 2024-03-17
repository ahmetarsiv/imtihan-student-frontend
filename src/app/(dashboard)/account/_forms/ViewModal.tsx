'use client';

import React, { ReactNode, useEffect } from 'react';
import { IStaticPageResponse } from '@/types/IStaticPage';
import { getStaticPages } from '@/store/slices/static-page';
import Link from 'next/link';
import {
    ChevronRightIcon,
    DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { Modal } from '@codenteq/interfeys';

interface IViewModalProps {
    open: boolean;
    // eslint-disable-next-line no-unused-vars
    setIsOpen(value: boolean): void;
}

export default function ViewModal({
    open,
    setIsOpen,
}: IViewModalProps): ReactNode {
    const { staticPages } = useSelector(state => state.staticPage);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getStaticPages());
    }, [dispatch]);

    return (
        <>
            {open && (
                <Modal
                    className="!px-0"
                    title="Sözleşmeler"
                    isOpen={open}
                    setIsOpen={setIsOpen}>
                    {staticPages.map(
                        (staticPage: IStaticPageResponse, key: number) => (
                            <Link
                                key={key}
                                href={'/static-page/' + staticPage?.id}>
                                <div className="border-b border-zinc-100 dark:border-zinc-900 hover:bg-zinc-100 focus:bg-zinc-100 dark:hover:bg-zinc-900 dark:focus:bg-zinc-900 w-full h-full p-5">
                                    <DocumentTextIcon className="text-brand w-6 h-6 mr-2 float-left" />
                                    <span className="text-zinc-500 dark:text-zinc-300">
                                        {staticPage?.name}
                                    </span>
                                    <ChevronRightIcon className="text-brand w-6 h-6 float-right" />
                                </div>
                            </Link>
                        ),
                    )}
                </Modal>
            )}
        </>
    );
}
