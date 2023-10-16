'use client';

import * as yup from 'yup';
import Modal from '@/components/Modal';
import Label from '@/components/Label';
import Input from '@/components/elements/Input';
import Button from '@/components/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import React, { useEffect } from 'react';
import { deleteUser, getUser, updateUser } from '@/store/slices/user';
import { IUserForm } from '@/types/IUser';
import InputFile from '@/components/elements/InputFile';
import InputSelect from '@/components/elements/InputSelect';
import { ICountryResponse } from '@/types/ICountry';
import { ICityResponse } from '@/types/ICity';
import { IStateResponse } from '@/types/IState';

interface IEditModalProps {
    open: boolean;
    // eslint-disable-next-line no-unused-vars
    setIsOpen: (value: boolean) => void;
    id: number;
}

const UserUpdateSchema: yup.ObjectSchema<IUserForm> = yup.object().shape({
    full_name: yup.string().required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
    phone: yup.string().required('Required'),
    address: yup.string().required('Required'),
    avatar: yup
        .mixed()
        .test(
            'avatar',
            'You need to provide a file',
            (value: any) => value.length > 0,
        ),
    country_id: yup.number().required('Required'),
    city_id: yup.number().required('Required'),
    state_id: yup.number().required('Required'),
});

export default function EditModal({ open, setIsOpen, id }: IEditModalProps) {
    const dispatch: AppDispatch = useDispatch();
    const { user } = useSelector((state: any) => state.user);
    const { countries } = useSelector(state => state.country);
    const { cities } = useSelector(state => state.city);
    const { states } = useSelector(state => state.state);

    const {
        handleSubmit,
        register,
        formState: { errors, isDirty },
    } = useForm<IUserForm, any>({
        resolver: yupResolver(UserUpdateSchema),
        values: {
            ...user,
        },
    });

    const onSubmit = (data: IUserForm) => {
        const formData = new FormData();

        if (typeof data.avatar[0] === 'object') {
            formData.append('avatar', data.avatar[0]);
        }

        for (const key in data) {
            if (key !== 'avatar') {
                const dataKey = data[key as keyof IUserForm];
                formData.append(key, dataKey);
            }
        }
        dispatch(updateUser(id, formData))
            .then(() => {
                toast.success('Başarıyla güncellendi!');
                setIsOpen(false);
            })
            .catch((err: any) => {
                toast.error(err?.response?.data?.message);
                console.log(err);
            });
    };

    const handleCountryChange = (event: any) => {
        const selectedCountryId = event.target.value;
        countries(selectedCountryId);
    };

    const handleCityChange = (event: any) => {
        const selectedCityId = event.target.value;
        cities(selectedCityId);
    };

    const handleStateChange = (event: any) => {
        const selectedStateId = event.target.value;
        states(selectedStateId);
    };

    useEffect(() => {
        if (id) {
            dispatch(getUser(id));
        }
    }, [id]);

    const handleDelete = (id: number) => {
        confirm('Emin misiniz?') && dispatch(deleteUser(id));
    };

    return (
        <>
            {open && (
                <Modal title="Düzenle" isOpen={open} setIsOpen={setIsOpen}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <InputFile className="my-4">
                                <Input
                                    {...register('avatar')}
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                />
                            </InputFile>
                            {errors.avatar?.message &&
                                typeof errors.avatar.message === 'string' && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.avatar.message}
                                    </p>
                                )}
                        </div>

                        <div className="grid gap-4 mb-6 lg:grid-cols-2">
                            <div>
                                <Label>Tam adınız</Label>
                                <Input
                                    {...register('full_name')}
                                    type="text"
                                    className="block mt-1 w-full"
                                />
                                {errors.full_name?.message && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.full_name?.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label>Eposta</Label>
                                <Input
                                    {...register('email')}
                                    type="email"
                                    className="block mt-1 w-full"
                                />
                                {errors.email?.message && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.email?.message}
                                    </p>
                                )}
                            </div>

                            <div className="w-full">
                                <Label>Telefon</Label>
                                <Input
                                    {...register('phone')}
                                    type="tel"
                                    className="block my-1 w-full"
                                />
                                <Label className="text-xs">
                                    Ülke kodu ile birlikte (+901234567890)
                                </Label>
                                {errors.phone?.message && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.phone?.message}
                                    </p>
                                )}
                            </div>

                            <div className="w-full">
                                <Label>Adres</Label>
                                <Input
                                    {...register('address')}
                                    type="text"
                                    className="block mt-1 w-full"
                                />
                                {errors.address?.message && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.address?.message}
                                    </p>
                                )}
                            </div>

                            <div className="w-full">
                                <Label>Ülke</Label>
                                <InputSelect
                                    defaultOption="Varsayılan"
                                    {...register('country_id')}
                                    onChange={handleCountryChange}
                                    className="block mt-1 w-full">
                                    {countries.map(
                                        (country: ICountryResponse) => (
                                            <option
                                                key={country.id}
                                                value={country.id}>
                                                {country.name}
                                            </option>
                                        ),
                                    )}
                                </InputSelect>
                                {errors.country_id?.message && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.country_id.message}
                                    </p>
                                )}
                            </div>

                            <div className="w-full">
                                <Label>Şehir</Label>
                                <InputSelect
                                    defaultOption="Varsayılan"
                                    {...register('city_id')}
                                    onChange={handleCityChange}
                                    className="block mt-1 w-full">
                                    {cities.map((city: ICityResponse) => (
                                        <option key={city.id} value={city.id}>
                                            {city.name}
                                        </option>
                                    ))}
                                </InputSelect>
                                {errors.city_id?.message && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.city_id.message}
                                    </p>
                                )}
                            </div>

                            <div className="w-full">
                                <Label>İlçe</Label>
                                <InputSelect
                                    defaultOption="Varsayılan"
                                    {...register('state_id')}
                                    onChange={handleStateChange}
                                    className="block mt-1 w-full">
                                    {states.map((state: IStateResponse) => (
                                        <option key={state.id} value={state.id}>
                                            {state.name}
                                        </option>
                                    ))}
                                </InputSelect>
                                {errors.state_id?.message && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.state_id.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <button
                                onClick={() => handleDelete(user?.id)}
                                className="underline text-sm text-red-600 hover:text-red-400">
                                Hesabımı sil
                            </button>

                            <Button type="submit" disabled={!isDirty}>
                                Kaydet
                            </Button>
                        </div>
                    </form>
                </Modal>
            )}
        </>
    );
}
