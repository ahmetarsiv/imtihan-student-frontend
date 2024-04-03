'use client';

import React, { ReactNode, useEffect } from 'react';
import { AppDispatch, useDispatch } from '@/store';
import { setTitle } from '@/store/slices/root';
import { Input, Label, Select } from '@codenteq/interfeys';
import EducationLevel from '@/enums/education-level';
import Gender from '@/enums/gender';
import { ICountryResponse } from '@/types/ICountry';
import { ICityResponse } from '@/types/ICity';
import { IStateResponse } from '@/types/IState';

export default function WizardPage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Wizard'));
    }, [dispatch]);

    return (
        <>
            <ol className="flex items-center w-full mb-4 sm:mb-5">
                <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                        <svg
                            className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 16">
                            <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                        </svg>
                    </div>
                </li>
                <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                        <svg
                            className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 14">
                            <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z" />
                            <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z" />
                        </svg>
                    </div>
                </li>
                <li className="flex items-center w-full">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                        <svg
                            className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 20">
                            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                        </svg>
                    </div>
                </li>
            </ol>
            <form>
                <h3 className="mb-4 leading-none text-zinc-900 dark:text-white">
                    Hesap detayları
                </h3>

                <div className="grid gap-4 mb-6 lg:grid-cols-2">
                    <div>
                        <Label>Tam adınız</Label>
                        <Input
                            className="w-full"
                            type="text"
                            name="full_name"
                        />
                    </div>

                    <div>
                        <Label>Email</Label>
                        <Input className="w-full" type="email" name="email" />
                    </div>

                    <div>
                        <Label>Telefon</Label>
                        <Input className="w-full" type="tel" name="phone" />
                    </div>

                    <div>
                        <Label>Doğum tarihi</Label>
                        <Input
                            className="w-full"
                            type="date"
                            name="birth_date"
                        />
                    </div>

                    <div>
                        <Label>Eğitim Seviyesi</Label>
                        <Select
                            name="education_level"
                            className="w-full"
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
                        />
                    </div>

                    <div>
                        <Label htmlFor="gender">Cinsiyet</Label>
                        <Select
                            name="gender"
                            className="w-full"
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
                        />
                    </div>

                    <div>
                        <Label>Adres</Label>
                        <Input name="address" type="text" className="w-full" />
                    </div>

                    <div>
                        <Label>Ülke</Label>
                        <Select
                            name="country_id"
                            className="w-full"
                            options={[
                                {
                                    label: 'Türkiye',
                                    value: 0,
                                },
                            ]}
                            placeholder="Choose"
                        />
                    </div>

                    <div>
                        <Label>Şehir</Label>
                        <Select
                            name="city_id"
                            className="w-full"
                            options={[
                                {
                                    label: 'Adana',
                                    value: 0,
                                },
                            ]}
                            placeholder="Choose"
                        />
                    </div>

                    <div>
                        <Label>İlçe</Label>
                        <Select
                            name="state_id"
                            className="w-full"
                            options={[
                                {
                                    label: 'Merkez',
                                    value: 0,
                                },
                            ]}
                            placeholder="Choose"
                        />
                    </div>

                    <div>
                        <Label>Dil</Label>
                        <Select
                            name="language_id"
                            className="w-full"
                            options={[
                                {
                                    label: 'Türkçe',
                                    value: 0,
                                },
                            ]}
                            placeholder="Choose"
                        />
                    </div>
                </div>
            </form>
        </>
    );
}
