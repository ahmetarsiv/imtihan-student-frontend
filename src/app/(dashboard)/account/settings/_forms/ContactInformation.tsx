'use client';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import React, { useEffect } from 'react';
import { getUser, updateUser } from '@/store/slices/user';
import { IContactInformationForm } from '@/types/IUser';
import { Button, Input, Label } from '@codenteq/interfeys';

const UserUpdateSchema: yup.ObjectSchema<IContactInformationForm> = yup
    .object()
    .shape({
        phone: yup
            .string()
            .matches(/^(\d{12})$/, 'Enter a valid phone number')
            .required('Required'),
    });

export default function ContactInformation() {
    const dispatch: AppDispatch = useDispatch();
    const { isLoading, user } = useSelector((state: any) => state.user);

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
                            <Label htmlFor="phone">Cep telefon numarası</Label>
                            <Input
                                {...register('phone')}
                                type="tel"
                                id="phone"
                                minLength={9}
                                maxLength={12}
                                className="block my-1 w-full"
                                helpText={
                                    'Ülke kodu ile birlikte (901234567890)'
                                }
                                required={true}
                                messages={errors.phone?.message}
                            />
                        </div>

                        <div className="w-full">
                            <Label>E-posta adresi</Label>
                            <Input
                                value={user?.email}
                                disabled
                                type="email"
                                className="block my-1 w-full"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <Button
                            isLoading={isLoading}
                            type={'submit'}
                            label={'Kaydet'}
                            disabled={!isDirty}
                        />
                    </div>
                </form>
            </div>
        </>
    );
}
