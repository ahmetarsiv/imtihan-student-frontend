'use client';

import {
    ArrowLeftOnRectangleIcon,
    CheckCircleIcon,
    ChevronRightIcon,
    DocumentTextIcon,
    EnvelopeOpenIcon,
    DevicePhoneMobileIcon,
    PencilSquareIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '@/hooks/auth';
import Footer from '@/layouts/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import config from '@/config/menu';
import Link from 'next/link';
import React, { ReactNode, useEffect, useState } from 'react';
import EditModal from '@/app/(dashboard)/account/_forms/EditModal';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { getStaticPages } from '@/store/slices/static-page';
import { IStaticPageResponse } from '@/types/IStaticPage';

export default function AccountPage(): ReactNode {
    const { user, logout } = useAuth();
    const dispatch: AppDispatch = useDispatch();
    const { staticPages } = useSelector(state => state.staticPage);
    const packageJson = require('/package.json');
    const version = packageJson.version;

    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [id, setId] = useState<number | undefined>(undefined);

    const handleEdit = (id: number | undefined) => {
        setOpenEditModal(true);
        setId(id);
    };

    useEffect(() => {
        dispatch(getStaticPages());
    }, [dispatch]);

    return (
        <>
            <main>
                <div className="grid grid-cols-1 gap-1">
                    <div className="border-b border-zinc-100 dark:border-zinc-900 p-5">
                        <div className="float-right cursor-pointer w-10 h-10 p-2">
                            <PencilSquareIcon
                                className="text-brand w-6 h-6"
                                onClick={() => handleEdit(user?.id)}
                            />
                        </div>
                        <UserIcon className="text-brand w-12 h-12 mr-2 float-left" />
                        <span className="text-xl font-medium text-zinc-900 dark:text-zinc-300">
                            {user?.full_name}
                        </span>
                    </div>

                    <div className="border-b border-zinc-100 dark:border-zinc-900 p-5">
                        <EnvelopeOpenIcon className="text-brand w-6 h-6 mr-2 float-left" />
                        <span className="text-zinc-900 dark:text-zinc-300">
                            {user?.email}
                        </span>

                        {user?.email_verified_at ? (
                            <span className="text-green-600 dark:text-green-500 float-right">
                                <CheckCircleIcon className="w-6 h-6" />
                            </span>
                        ) : (
                            <span className="text-red-600 dark:text-red-500 float-right">
                                <CheckCircleIcon className="w-6 h-6" />
                            </span>
                        )}
                    </div>

                    <div className="p-5">
                        <DevicePhoneMobileIcon className="text-brand w-6 h-6 mr-2 float-left" />
                        <span className="text-zinc-900 dark:text-zinc-300">
                            {user?.phone ? (
                                user?.phone
                            ) : (
                                <button onClick={() => handleEdit(user?.id)}>
                                    Telefon numaranı ekle
                                </button>
                            )}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-1 mt-20">
                    {config.account.map((item, index) => (
                        <Link href={item.path} key={index}>
                            <div className="block lg:hidden border-b border-zinc-100 dark:border-zinc-900 hover:bg-zinc-100 focus:bg-zinc-100 dark:hover:bg-zinc-900 dark:focus:bg-zinc-900 w-full h-full p-5">
                                {item.icon}
                                <span className="text-zinc-500 dark:text-zinc-300">
                                    {item.name}
                                </span>
                                <ChevronRightIcon className="text-brand w-6 h-6 float-right" />
                            </div>
                        </Link>
                    ))}

                    <ThemeToggle />

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

                    <div
                        onClick={logout}
                        className="border-b border-zinc-100 dark:border-zinc-900 hover:bg-zinc-100 focus:bg-zinc-100 dark:hover:bg-zinc-900 dark:focus:bg-zinc-900 w-full h-full p-5">
                        <ArrowLeftOnRectangleIcon className="text-brand w-6 h-6 mr-2 float-left" />
                        <span className="text-zinc-500 dark:text-zinc-300">
                            Oturumu Kapat
                        </span>
                        <ChevronRightIcon className="text-brand w-6 h-6 float-right" />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-1 mt-10">
                    <div className="border-b border-zinc-100 dark:border-zinc-900 w-full h-full p-5">
                        <span className="text-zinc-500 dark:text-zinc-300">
                            Version
                        </span>
                        <span className="float-right text-zinc-500 dark:text-zinc-500">
                            {version}
                        </span>
                    </div>
                </div>

                {id && (
                    <EditModal
                        open={openEditModal}
                        setIsOpen={setOpenEditModal}
                        id={id}
                    />
                )}

                <Footer className="block lg:hidden text-center mt-5" />
            </main>
        </>
    );
}
