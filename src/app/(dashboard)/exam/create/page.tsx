'use client';

import Button from '@/components/Button';
import { ReactNode, useState } from 'react';
import Label from '@/components/Label';
import InputRange from '@/components/elements/InputRange';
import InputSelect from '@/components/elements/InputSelect';
import Input from '@/components/elements/Input';

export default function ExamCreatePage(): ReactNode {
    const [sliderValue, setSliderValue] = useState(50);

    const handleSliderChange = e => {
        setSliderValue(e.target.value);
    };
    return (
        <>
            <main>
                <div className="grid lg:grid-cols-2">
                    <div className="p-3">
                        <form>
                            <div className="flex items-center justify-end my-4">
                                <Button type="submit">Kaydet</Button>
                            </div>

                            <div className="flex flex-col gap-5">
                                <div>
                                    <Label>Zorluk Seviyesi</Label>
                                    <InputRange
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
                                    <InputSelect
                                        defaultOption="Varsayılan"
                                        className="block mt-1 w-full">
                                        <option>YKS</option>
                                    </InputSelect>
                                </div>

                                <div className="grid lg:grid-cols-2 gap-4">
                                    <div>
                                        <Label>Süre</Label>
                                        <Input
                                            type="number"
                                            className="block mt-1 w-full"
                                        />
                                        <Label className="text-xs">
                                            Toplam sınav süresini belirtin.
                                        </Label>
                                    </div>
                                    <div>
                                        <Label>Adet</Label>
                                        <Input
                                            type="number"
                                            className="block mt-1 w-full"
                                        />
                                        <Label className="text-xs">
                                            Sınavda kaç adet soru olacağını
                                            belirtin.
                                        </Label>
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
