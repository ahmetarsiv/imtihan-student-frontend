'use client';

import * as yup from 'yup';
import Label from '@/components/Label';
import Input from '@/components/elements/Input';
import Button from '@/components/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import React, { useEffect, useState } from 'react';
import { deleteUser, getUser, updateUser } from '@/store/slices/user';
import { IMembershipInformationForm } from '@/types/IUser';
import InputFile from '@/components/elements/InputFile';
import InputSelect from '@/components/elements/InputSelect';
import Gender from '@/enums/gender';
import InfoCard from '@/components/cards/InfoCard';
import { getCities } from '@/store/slices/city';
import { getStates } from '@/store/slices/state';
import { getCountries } from '@/store/slices/country';
import { ICountryResponse } from '@/types/ICountry';
import { ICityResponse } from '@/types/ICity';
import { IStateResponse } from '@/types/IState';

const UserUpdateSchema: yup.ObjectSchema<IMembershipInformationForm> = yup
    .object()
    .shape({
        full_name: yup.string().required('Required'),
        address: yup.string(),
        avatar: yup
            .mixed()
            .test(
                'avatar',
                'You need to provide a file',
                (value: any) => value.length > 0,
            ),
        gender: yup.number().required('Required'),
        country_id: yup.number(),
        city_id: yup.number(),
        state_id: yup.number(),
    });

export default function MembershipInformation() {
    const dispatch: AppDispatch = useDispatch();
    const { user } = useSelector((state: any) => state.user);
    const { countries } = useSelector(state => state.country);
    const { cities } = useSelector(state => state.city);
    const { states } = useSelector(state => state.state);
    const [isLoading, setIsLoading] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { errors, isDirty },
    } = useForm<IMembershipInformationForm>({
        resolver: yupResolver(UserUpdateSchema),
        values: {
            full_name: user?.full_name,
            address: user?.address,
            avatar: user?.avatar,
            gender: user?.gender,
            country_id: user?.country_id,
            city_id: user?.city_id,
            state_id: user?.state_id,
        },
    });

    const onSubmit = (data: IMembershipInformationForm) => {
        setIsLoading(true);
        const formData = new FormData();

        if (typeof data.avatar[0] === 'object') {
            formData.append('avatar', data.avatar[0]);
        }

        for (const key in data) {
            if (key !== 'avatar') {
                const dataKey = data[key as keyof IMembershipInformationForm];
                formData.append(key, dataKey);
            }
        }
        dispatch(updateUser(formData))
            .then(() => {
                toast.success('Başarıyla güncellendi!');
            })
            .catch((err: any) => {
                toast.error(err?.response?.data?.message);
                console.log(err);
            });
    };

    const handleCountryChange = (event: any) => {
        const selectedCountryId = event.target.value;
        dispatch(getCities(selectedCountryId));
    };

    const handleCityChange = (event: any) => {
        const selectedCityId = event.target.value;
        dispatch(getStates(selectedCityId));
    };

    useEffect(() => {
        dispatch(getCountries());
        if (user?.city_id) {
            dispatch(getCities(user?.country_id));
        }
        if (user?.state_id) {
            dispatch(getStates(user?.city_id));
        }
        dispatch(getUser());
    }, [dispatch]);

    const handleDelete = () => {
        confirm('Emin misiniz?') && dispatch(deleteUser());
    };

    return (
        <>
            <div className="mt-16">
                <div>
                    <h3>Profil bilgileri</h3>
                    <Label>
                        İmtihan’daki deneyiminizi en iyi seviyede tutabilmemiz
                        için gereken bilgilerinizi buradan düzenleyebilirsiniz.
                    </Label>
                </div>
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

                        <div className="w-full">
                            <Label>Cinsiyet</Label>
                            <InputSelect
                                defaultOption="Varsayılan"
                                {...register('gender')}
                                className="block mt-1 w-full">
                                <option value={Gender.MALE}>Erkek</option>
                                <option value={Gender.FEMALE}>Kadın</option>
                            </InputSelect>
                            {errors.gender?.message && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    {errors.gender.message}
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
                                {countries.map((country: ICountryResponse) => (
                                    <option key={country.id} value={country.id}>
                                        {country.name}
                                    </option>
                                ))}
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
                            onClick={() => handleDelete()}
                            className="underline text-sm text-red-600 hover:text-red-400">
                            Hesabımı sil
                        </button>

                        <Button
                            isLoading={isLoading}
                            type="submit"
                            disabled={!isDirty}>
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
                            description="Oturumu nasıl kapatabilirim?"
                            link="https://support.imtihan.tech/account-help#oturumu-kapatma"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
