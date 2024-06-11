'use client';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import React, { useEffect, useState } from 'react';
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
        email: yup
            .string()
            .email('Enter a valid email address')
            .optional()
            .required('Required'),
    });

export default function ContactInformation() {
    const dispatch: AppDispatch = useDispatch();
    const { user, isLoading } = useSelector(state => state.user);
    const [isEditingEmail, setIsEditingEmail] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { errors, isDirty },
    } = useForm<IContactInformationForm, any>({
        resolver: yupResolver(UserUpdateSchema),
        values: {
            phone: user?.phone || '',
            email: user?.email || '',
        },
    });

    const onSubmit = (data: IContactInformationForm) => {
        dispatch(updateUser(data))
            .then(() => {
                toast.success('Başarıyla güncellendi!');
            })
            .catch((err: any) => {
                toast.error(err?.response?.data?.message);
            });
    };

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const handleEmailEdit = () => {
        setIsEditingEmail(true);
    };

    return (
        <>
            <div className="mt-16">
                <div className="mb-6">
                    <h3>İletişim tercihlerim</h3>
                    <Label>
                        Bilgilendirme Metni kapsamında önemli kampanyalardan
                        haberdar olmak için tercih ettiğiniz yöntemleri
                        belirtebilirsiniz. (Mobil bildirimler İleti Yönetim
                        Sistemi kapsamında değildir.)
                    </Label>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 mb-6 lg:grid-cols-2">
                        <div>
                            <Input
                                {...register('phone')}
                                type="tel"
                                id="phone"
                                label="Cep telefon numarası"
                                minLength={9}
                                maxLength={12}
                                className="block my-1 w-full"
                                helpText={
                                    'Ülke kodu ile birlikte (901234567890)'
                                }
                                messages={errors.phone?.message}
                            />
                        </div>

                        <div>
                            <Label className="flex justify-between">
                                E-posta adresi
                                {!isEditingEmail && (
                                    <button
                                        type="button"
                                        onClick={handleEmailEdit}
                                        className="text-brand font-bold">
                                        Değiştir
                                    </button>
                                )}
                            </Label>
                            <Input
                                {...register('email')}
                                value={isEditingEmail ? undefined : user?.email}
                                disabled={!isEditingEmail}
                                type="email"
                                id="email"
                                className="block my-1 w-full"
                                helpText={
                                    'Bu bilgileri değiştirebilmek için yeni e-posta adresini doğrulamanızı isteyeceğiz.'
                                }
                                messages={errors.email?.message}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <Button
                            isLoading={isLoading}
                            type="submit"
                            disabled={!isDirty}
                            label="Kaydet"
                        />
                    </div>
                </form>
            </div>
        </>
    );
}
