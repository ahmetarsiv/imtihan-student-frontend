'use client';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import React from 'react';
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
    const { isLoading } = useSelector(state => state.user);

    const {
        handleSubmit,
        register,
        formState: { errors, isDirty },
    } = useForm<IUpdatePasswordForm, any>({
        resolver: yupResolver(UserUpdateSchema),
    });

    const onSubmit = (data: IUpdatePasswordForm) => {
        dispatch(updatePassword(data))
            .then(() => {
                toast.success('Başarıyla güncellendi!');
            })
            .catch((err: any) => {
                console.log(err);
                toast.error(err?.message);
            });
    };

    return (
        <>
            <div className="mt-16">
                <h3>Parolanı güncelle</h3>
                <Label className="mb-6">
                    Şifreniz en az bir harf, rakam veya özel karakter içermeli.
                    Ayrıca şifreniz en az 8 karakterden oluşmalı.
                </Label>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4 mb-6">
                        <div>
                            <Input
                                {...register('current_password')}
                                type="password"
                                id="current_password"
                                label="Mevcut şifre"
                                className="block mt-1 w-full"
                                minLength={8}
                                messages={errors.current_password?.message}
                            />
                        </div>

                        <div>
                            <Input
                                {...register('password')}
                                type="password"
                                id="password"
                                label="Yeni şifre"
                                className="block mt-1 w-full"
                                helpText="Güvenliğiniz için adınız, soyadınız ve doğum tarihinizi içermeyen bir şifre belirleyin."
                                minLength={8}
                                messages={errors.password?.message}
                            />
                        </div>

                        <div>
                            <Input
                                {...register('password_confirmation')}
                                type="password"
                                id="password_confirmation"
                                label="Yeni şifre tekrar"
                                className="block mt-1 w-full"
                                minLength={8}
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
                                href="https://support.imtihantech.com/account-help#oturum-a%C3%A7ma-bilgilerini-hat%C4%B1rlam%C4%B1yorum"
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
