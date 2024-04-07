'use client';

import React, { ReactNode } from 'react';
import { Button, Input, Select } from '@codenteq/interfeys';

interface Step2Props {
    onNext: () => void;
    onPrev: () => void;
}

export default function Step2({ onNext, onPrev }: Step2Props): ReactNode {
    return (
        <form onSubmit={onNext}>
            <h3 className="leading-none text-zinc-900 dark:text-white my-10">
                Fatura adresi
            </h3>

            <div className="grid gap-4 mb-6 lg:grid-cols-2">
                <div>
                    <Input
                        name="address"
                        type="text"
                        className="w-full"
                        label="Adres"
                    />
                </div>

                <div>
                    <Select
                        name="country_id"
                        label="Ülke"
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
                    <Select
                        name="city_id"
                        label="Şehir"
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
                    <Select
                        name="state_id"
                        label="İlçe"
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
            </div>

            <div className="flex items-center justify-between">
                <button type="button" onClick={onPrev} className="mr-2">
                    Önceki
                </button>
                <Button type="submit" label="Sonraki" />
            </div>
        </form>
    );
}
