'use client';

import {
    ArrowTopRightOnSquareIcon,
    CreditCardIcon,
} from '@heroicons/react/24/outline';
import { ReactNode, useEffect } from 'react';
import { AppDispatch, useDispatch } from '@/store';
import { setTitle } from '@/store/slices/root';
import { Button, InfoCard, Label } from '@codenteq/interfeys';
import Link from 'next/link';

export default function PlanPage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Planlarım'));
    }, [dispatch]);
    return (
        <>
            <main>
                <div className="flex flex-col items-center lg:max-w-4xl border border-brand rounded">
                    <div className="bg-zinc-50 dark:bg-zinc-950 w-full px-10 py-24">
                        <h3 className="text-3xl font-bold">Premium Üyelik</h3>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between p-4 gap-4">
                        <div>
                            <p className="pb-7">
                                Sınırsız çevrimiçi sınav, eğitim materyalleri ve
                                ilerleme takibi hakkı.
                            </p>
                            <a
                                href="https://support.imtihantech.com/plan-help#premium-planlar%C4%B1"
                                target="_blank"
                                rel="noreferrer">
                                <span className="underline">
                                    Planın hakkında bilgi edin
                                </span>
                            </a>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold pb-5">Ödeme</h3>
                            <label>
                                Sonraki faturan 69,99 TL tutarında ve 29.10.2023
                                tarihinde.
                            </label>
                            <div className="flex items-center pt-7 gap-5">
                                <CreditCardIcon className="h-9 w-9" />
                                <div>
                                    <h4>0000 ile biten Mastercard kartın</h4>
                                    <Label>
                                        Son geçerlilik tarihi: 04/2028
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-5 lg:max-w-xs">
                    <Button
                        className="w-full"
                        type={'button'}
                        label="Planı Değiştir"
                    />
                </div>

                <div>
                    <h3 className="text-zinc-700 dark:text-zinc-400 font-semibold text-xl mb-2.5">
                        Sorularınız mı var?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        <InfoCard className="max-w-sm p-6 bg-zinc-50 dark:bg-zinc-950">
                            <p className="mb-5 text-base text-zinc-900 dark:text-zinc-400">
                                Premium planımı nasıl iptal edebilirim?
                            </p>
                            <Link
                                href="https://support.imtihantech.com/plan-help#premium-planlar%C4%B1n%C4%B1-iptal-etme"
                                target="_blank"
                                className="inline-flex items-center text-blue-500 hover:text-blue-400">
                                Detaylı bilgi
                                <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1.5" />
                            </Link>
                        </InfoCard>

                        <InfoCard className="max-w-sm p-6 bg-zinc-50 dark:bg-zinc-950">
                            <p className="mb-5 text-base text-zinc-900 dark:text-zinc-400">
                                Premium planım doğru çalışmıyor. Ne yapmalıyım?
                            </p>
                            <Link
                                href="https://support.imtihantech.com/plan-help#premium-%C3%A7al%C4%B1%C5%9Fm%C4%B1yor"
                                target="_blank"
                                className="inline-flex items-center text-blue-500 hover:text-blue-400">
                                Detaylı bilgi
                                <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1.5" />
                            </Link>
                        </InfoCard>

                        <InfoCard className="max-w-sm p-6 bg-zinc-50 dark:bg-zinc-950">
                            <p className="mb-5 text-base text-zinc-900 dark:text-zinc-400">
                                Premium fiyatı neden arttı?
                            </p>
                            <Link
                                href="https://support.imtihantech.com/payment-help#fiyat-g%C3%BCncellemeri"
                                target="_blank"
                                className="inline-flex items-center text-blue-500 hover:text-blue-400">
                                Detaylı bilgi
                                <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1.5" />
                            </Link>
                        </InfoCard>
                    </div>
                </div>
            </main>
        </>
    );
}
