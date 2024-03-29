'use client';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { AppDispatch, useDispatch } from '@/store';
import React, { useState } from 'react';
import { updatePassword } from '@/store/slices/user';
import { IUpdatePasswordForm } from '@/types/IUser';
import { Button, InfoCard, Input, Label } from '@codenteq/interfeys';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

const UserUpdateSchema: yup.ObjectSchema<IUpdatePasswordForm> = yup
    .object()
    .shape({
        password: yup.string().required('Required'),
        current_password: yup.string().required('Required'),
        password_confirmation: yup.string().required('Required'),
    });

export default function PasswordEdit() {
    const dispatch: AppDispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { errors, isDirty },
    } = useForm<IUpdatePasswordForm, any>({
        resolver: yupResolver(UserUpdateSchema),
    });

    const onSubmit = (data: IUpdatePasswordForm) => {
        setIsLoading(true);
        dispatch(updatePassword(data))
            .then(() => {
                toast.success('Başarıyla güncellendi!');
            })
            .catch((err: any) => {
                toast.error(err?.response?.data?.message);
                console.log(err);
            });
    };

    return (
        <>
            <div className="mt-16">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4 mb-6">
                        <div>
                            <Label>Mevcut şifre</Label>
                            <Input
                                {...register('current_password')}
                                type="password"
                                className="block mt-1 w-full"
                                messages={errors.current_password?.message}
                            />
                        </div>

                        <div>
                            <Label>Yeni şifre</Label>
                            <Input
                                {...register('password')}
                                type="password"
                                className="block mt-1 w-full"
                                messages={errors.password?.message}
                            />
                        </div>

                        <div>
                            <Label>Yeni şifre tekrar</Label>
                            <Input
                                {...register('password_confirmation')}
                                type="password"
                                className="block mt-1 w-full"
                                messages={errors.password_confirmation?.message}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-end mt-4">
                        <Button
                            isLoading={isLoading}
                            type={'submit'}
                            label={'Kaydet'}
                            disabled={!isDirty}
                        />
                    </div>
                </form>

                <div className="mt-4">
                    <h3 className="text-zinc-700 dark:text-zinc-400 font-semibold text-xl mb-2.5">
                        Sorularınız mı var?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <InfoCard className="max-w-sm p-6 bg-zinc-50 dark:bg-zinc-950">
                            <p className="mb-5 text-base text-zinc-900 dark:text-zinc-400">
                                Oturum açma bilgilerini hatırlamıyorum.
                            </p>
                            <Link
                                href="https://support.imtihan.tech/account-help#oturum-a%C3%A7ma-bilgilerini-hat%C4%B1rlam%C4%B1yorum"
                                target="_blank"
                                className="inline-flex items-center text-blue-500 hover:text-blue-400">
                                Detaylı bilgi
                                <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1.5" />
                            </Link>
                        </InfoCard>
                    </div>
                </div>
            </div>
        </>
    );
}
