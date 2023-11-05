'use client';

import * as yup from 'yup';
import Label from '@/components/Label';
import Input from '@/components/elements/Input';
import Button from '@/components/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { AppDispatch, useDispatch } from '@/store';
import React from 'react';
import { updatePassword } from '@/store/slices/user';
import { IUpdatePasswordForm } from '@/types/IUser';
import InfoCard from '@/components/cards/InfoCard';

const UserUpdateSchema: yup.ObjectSchema<IUpdatePasswordForm> = yup
    .object()
    .shape({
        password: yup.string().required('Required'),
        current_password: yup.string().required('Required'),
        password_confirmation: yup.string().required('Required'),
    });

export default function PasswordEdit() {
    const dispatch: AppDispatch = useDispatch();

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
                            />
                            {errors.current_password?.message && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    {errors.current_password?.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label>Yeni şifre</Label>
                            <Input
                                {...register('password')}
                                type="password"
                                className="block mt-1 w-full"
                            />
                            {errors.password?.message && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    {errors.password?.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label>Yeni şifre tekrar</Label>
                            <Input
                                {...register('password_confirmation')}
                                type="password"
                                className="block mt-1 w-full"
                            />
                            {errors.password_confirmation?.message && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    {errors.password_confirmation?.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-end mt-4">
                        <Button type="submit" disabled={!isDirty}>
                            Kaydet
                        </Button>
                    </div>
                </form>

                <div className="mt-4">
                    <h3 className="text-zinc-700 dark:text-zinc-400 font-semibold text-xl mb-2.5">
                        Sorularınız mı var?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <InfoCard
                            description="Oturum açma bilgilerini hatırlamıyorum."
                            link="https://support.imtihan.tech/account-help#oturum-a%C3%A7ma-bilgilerini-hat%C4%B1rlam%C4%B1yorum"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
