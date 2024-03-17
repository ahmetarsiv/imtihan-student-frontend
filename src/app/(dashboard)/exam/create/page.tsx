'use client';

import { ReactNode, useEffect, useState } from 'react';
import { AppDispatch, useDispatch } from '@/store';
import { setTitle } from '@/store/slices/root';
import { Button, Input, Label, Select } from '@codenteq/interfeys';

export default function ExamCreatePage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();
    const [sliderValue, setSliderValue] = useState(50);

    const handleSliderChange = (e: any) => {
        setSliderValue(e.target.value);
    };

    useEffect(() => {
        dispatch(setTitle('Sınav Oluştur'));
    }, []);

    return (
        <>
            <main>
                <div className="grid lg:grid-cols-2">
                    <div className="p-3">
                        <form>
                            <div className="flex items-center justify-end my-4">
                                <Button type={'submit'} label={'Kaydet'} />
                            </div>

                            <div className="flex flex-col gap-5">
                                <div>
                                    <Label>Zorluk Seviyesi</Label>
                                    <Input
                                        className="w-full"
                                        type={'range'}
                                        min={0}
                                        max={3}
                                        value={sliderValue}
                                        onChange={handleSliderChange}
                                    />
                                    <div className="flex justify-between">
                                        <Label>Varsayılan</Label>
                                        <Label>Kolay</Label>
                                        <Label>Orta</Label>
                                        <Label>Zor</Label>
                                    </div>
                                </div>

                                <div>
                                    <Label>Kategori</Label>
                                    <Select
                                        className="block mt-1 w-full"
                                        options={[
                                            {
                                                label: 'YKS',
                                                value: '1',
                                            },
                                        ]}
                                        placeholder="Choose"
                                    />
                                </div>

                                <div className="grid lg:grid-cols-2 gap-4">
                                    <div>
                                        <Label>Süre</Label>
                                        <Input
                                            type="number"
                                            className="block mt-1 w-full"
                                            helpText={
                                                'Toplam sınav süresini belirtin.'
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>Adet</Label>
                                        <Input
                                            type="number"
                                            className="block mt-1 w-full"
                                            helpText={
                                                'Sınavda kaç adet soru olacağını belirtin.'
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}
