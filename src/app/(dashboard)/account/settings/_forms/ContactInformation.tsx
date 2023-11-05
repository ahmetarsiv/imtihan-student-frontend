'use client';

import * as yup from 'yup';
import Label from '@/components/Label';
import Input from '@/components/elements/Input';
import Button from '@/components/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import React, { useEffect } from 'react';
import { getUser, updateUser } from '@/store/slices/user';
import { IContactInformationForm } from '@/types/IUser';

const UserUpdateSchema: yup.ObjectSchema<IContactInformationForm> = yup
    .object()
    .shape({
        phone: yup.string().required('Required'),
    });

export default function ContactInformation() {
    const dispatch: AppDispatch = useDispatch();
    const { user } = useSelector((state: any) => state.user);

    const {
        handleSubmit,
        register,
        formState: { errors, isDirty },
    } = useForm<IContactInformationForm, any>({
        resolver: yupResolver(UserUpdateSchema),
        values: {
            phone: user?.phone,
        },
    });

    const onSubmit = (data: IContactInformationForm) => {
        console.log(data);
        dispatch(updateUser(data))
            .then(() => {
                toast.success('Başarıyla güncellendi!');
            })
            .catch((err: any) => {
                toast.error(err?.response?.data?.message);
                console.log(err);
            });
    };

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);
    return (
        <>
            <div className="mt-16">
                <div className="mb-6">
                    <h3>İletişim tercihlerim</h3>
                    <Label>
                        Bilgilendirme Metni kapsamında önemli kampanyalardan
                        haberdar olmak için tercih ettiğiniz yöntemleri
                        belirtebilirsiniz.
                    </Label>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 mb-6 lg:grid-cols-2">
                        <div>
                            <Label>Cep telefon numarası</Label>
                            <Input
                                {...register('phone')}
                                type="tel"
                                className="block my-1 w-full"
                            />
                            {errors.phone?.message && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    {errors.phone?.message}
                                </p>
                            )}
                        </div>

                        <div className="w-full">
                            <Label>E-posta adresi</Label>
                            <Input
                                value={user?.email}
                                disabled
                                type="tel"
                                className="block my-1 w-full"
                            />
                            {errors.phone?.message && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    {errors.phone?.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <Button type="submit" disabled={!isDirty}>
                            Kaydet
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
