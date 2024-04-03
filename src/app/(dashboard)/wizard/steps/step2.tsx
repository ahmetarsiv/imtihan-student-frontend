'use client';

import React, { ReactNode } from 'react';
import { Button, Input, Label, Select } from '@codenteq/interfeys';

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
