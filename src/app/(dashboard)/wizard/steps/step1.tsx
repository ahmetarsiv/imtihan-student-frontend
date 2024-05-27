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
                        placeholder="Choose">
                        <option value={EducationLevel.PRIMARY}>İlkokul</option>
                        <option value={EducationLevel.MIDDLE}>Ortaokul</option>
                        <option value={EducationLevel.HIGH}>Lise</option>
                        <option value={EducationLevel.UNIVERSITY}>
                            Üniversite
                        </option>
                    </Select>
                </div>

                <div>
                    <Select
                        name="gender"
                        label="Cinsiyet"
                        className="w-full"
                        placeholder="Choose">
                        <option value={Gender.MALE}>Erkek</option>
                        <option value={Gender.FEMALE}>Kadın</option>
                    </Select>
                </div>

                <div>
                    <Select
                        name="language_id"
                        label="Dil"
                        className="w-full"
                        placeholder="Choose">
                        <option value="1">Türkçe</option>
                    </Select>
                </div>
            </div>

            <div className="float-right">
                <Button type="submit" label="Sonraki" />
            </div>
        </form>
    );
}
