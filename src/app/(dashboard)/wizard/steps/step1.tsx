'use client';

import React, { ReactNode } from 'react';
import { Button, Input, Select } from '@codenteq/interfeys';
import EducationLevel from '@/enums/education-level';
import Gender from '@/enums/gender';

interface Step1Props {
    onNext: () => void;
}

export default function Step1({ onNext }: Step1Props): ReactNode {
    return (
        <form onSubmit={onNext}>
            <h3 className="leading-none text-zinc-900 dark:text-white my-10">
                Hesap detayları
            </h3>

            <div className="grid gap-4 mb-6 lg:grid-cols-2">
                <div>
                    <Input
                        className="w-full"
                        type="tel"
                        name="phone"
                        label="Telefon"
                    />
                </div>

                <div>
                    <Input
                        className="w-full"
                        type="date"
                        name="birth_date"
                        label="Doğum tarihi"
                    />
                </div>

                <div>
                    <Select
                        name="education_level"
                        label="Eğitim Seviyesi"
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
                    <Select
                        name="gender"
                        label="Cinsiyet"
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
                    <Select
                        name="language_id"
                        label="Dil"
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

            <div className="float-right">
                <Button type="submit" label="Sonraki" />
            </div>
        </form>
    );
}
