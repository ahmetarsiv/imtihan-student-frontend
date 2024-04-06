'use client';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import React, { useEffect } from 'react';
import { deleteUser, getUser, updateUser } from '@/store/slices/user';
import { IMembershipInformationForm } from '@/types/IUser';
import Gender from '@/enums/gender';
import { getCities } from '@/store/slices/city';
import { getStates } from '@/store/slices/state';
import { getCountries } from '@/store/slices/country';
import { ICountryResponse } from '@/types/ICountry';
import { ICityResponse } from '@/types/ICity';
import { IStateResponse } from '@/types/IState';
import { Button, InfoCard, Input, Label, Select } from '@codenteq/interfeys';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import EducationLevel from '@/enums/education-level';
import moment from 'moment';

const UserUpdateSchema: yup.ObjectSchema<IMembershipInformationForm> = yup
    .object()
    .shape({
        full_name: yup.string().required('Required'),
        address: yup.string(),
        gender: yup.string().required('Required'),
        country_id: yup.number(),
        city_id: yup.number(),
        state_id: yup.number(),
        birth_date: yup.string().required('Required'),
        education_level: yup.string().required('Required'),
    });

export default function MembershipInformation() {
    const dispatch: AppDispatch = useDispatch();
    const { isLoading, user } = useSelector((state: any) => state.user);
    const { countries } = useSelector(state => state.country);
    const { cities } = useSelector(state => state.city);
    const { states } = useSelector(state => state.state);

    const {
        handleSubmit,
        register,
        formState: { errors, isDirty },
    } = useForm<IMembershipInformationForm>({
        resolver: yupResolver(UserUpdateSchema),
        values: {
            full_name: user?.full_name,
            address: user?.address,
            gender: user?.gender,
            country_id: user?.country_id,
            city_id: user?.city_id,
            state_id: user?.state_id,
            birth_date: user?.birth_date,
            education_level: user?.education_level,
        },
    });

    const onSubmit = (data: IMembershipInformationForm) => {
        data.birth_date = moment(data.birth_date).format('YYYY-MM-DD');
        dispatch(updateUser(data))
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
                <div className="mb-6">
                    <h3>Profil bilgileri</h3>
                    <Label>
                        İmtihan’daki deneyiminizi en iyi seviyede tutabilmemiz
                        için gereken bilgilerinizi buradan düzenleyebilirsiniz.
                    </Label>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 mb-6 lg:grid-cols-2">
                        <div>
                            <Label htmlFor="full_name">Tam adınız</Label>
                            <Input
                                {...register('full_name')}
                                type="text"
                                id="full_name"
                                className="block mt-1 w-full"
                                messages={errors.full_name?.message}
                            />
                        </div>

                        <div className="w-full">
                            <Label htmlFor="gender">Cinsiyet</Label>
                            <Select
                                {...register('gender')}
                                id="gender"
                                className="block mt-1 w-full"
                                options={[
                                    {
                                        label: 'Erkek',
                                        value: Gender.MALE,
                                    },
                                    {
                                        label: 'Kadın',
                                        value: Gender.FEMALE,
                                    },
                                ]}
                                placeholder="Choose"
                                messages={errors.gender?.message}
                            />
                        </div>

                        <div className="w-full">
                            <Label htmlFor="address">Adres</Label>
                            <Input
                                {...register('address')}
                                type="text"
                                id="address"
                                className="block mt-1 w-full"
                                messages={errors.address?.message}
                            />
                        </div>

                        <div className="w-full">
                            <Label htmlFor="country_id">Ülke</Label>
                            <Select
                                {...register('country_id')}
                                id="country_id"
                                onChange={handleCountryChange}
                                className="block mt-1 w-full"
                                options={countries.map(
                                    (country: ICountryResponse) => ({
                                        key: country.id,
                                        label: country.name,
                                        value: country.id,
                                    }),
                                )}
                                placeholder="Choose"
                                messages={errors.country_id?.message}
                            />
                        </div>

                        <div className="w-full">
                            <Label htmlFor="city_id">Şehir</Label>
                            <Select
                                {...register('city_id')}
                                id="city_id"
                                onChange={handleCityChange}
                                className="block mt-1 w-full"
                                options={cities.map((city: ICityResponse) => ({
                                    key: city.id,
                                    label: city.name,
                                    value: city.id,
                                }))}
                                placeholder="Choose"
                                messages={errors.city_id?.message}
                            />
                        </div>

                        <div className="w-full">
                            <Label htmlFor="state_id">İlçe</Label>
                            <Select
                                {...register('state_id')}
                                id="state_id"
                                className="block mt-1 w-full"
                                options={states.map(
                                    (state: IStateResponse) => ({
                                        key: state.id,
                                        label: state.name,
                                        value: state.id,
                                    }),
                                )}
                                placeholder="Choose"
                                messages={errors.state_id?.message}
                            />
                        </div>

                        <div>
                            <Label htmlFor="education_level">
                                Eğitim Seviyesi
                            </Label>
                            <Select
                                {...register('education_level')}
                                id="education_level"
                                className="block mt-1 w-full"
                                options={[
                                    {
                                        label: 'İlkokul',
                                        value: EducationLevel.PRIMARY,
                                    },
                                    {
                                        label: 'Orta okul',
                                        value: EducationLevel.MIDDLE,
                                    },
                                    {
                                        label: 'Lise',
                                        value: EducationLevel.HIGH,
                                    },
                                    {
                                        label: 'Üniversite',
                                        value: EducationLevel.UNIVERSITY,
                                    },
                                ]}
                                placeholder="Choose"
                                messages={errors.education_level?.message}
                            />
                        </div>

                        <div className="w-full">
                            <Label htmlFor="birth_date">Doğum Tarihi</Label>
                            <Input
                                {...register('birth_date')}
                                type="date"
                                id="birth_date"
                                className="block mt-1 w-full"
                                messages={errors.birth_date?.message}
                            />
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
                            type={'submit'}
                            disabled={!isDirty}
                            label={'Kaydet'}
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
                                Oturumu nasıl kapatabilirim?
                            </p>
                            <Link
                                href="https://support.imtihantech.com/account-help#oturumu-kapatma"
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
