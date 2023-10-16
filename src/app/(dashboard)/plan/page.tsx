'use client';

import { CreditCardIcon } from '@heroicons/react/24/outline';
import Label from '@/components/Label';
import NavLink from '@/components/NavLink';
import InfoCard from '@/components/cards/InfoCard';
import { ReactNode } from 'react';

export default function PlanPage(): ReactNode {
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
                                href="https://support.imtihan.tech/plan-help#premium-planlar%C4%B1"
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
                                Sonraki faturan 17,99 TL tutarında ve 29.10.2023
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
                    <NavLink name="Planı Değiştir" href="#" />
                </div>

                <div>
                    <h3 className="text-zinc-700 dark:text-zinc-400 font-semibold text-xl mb-2.5">
                        Sorularınız mı var?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        <InfoCard
                            description="Premium planımı nasıl iptal edebilirim?"
                            link="https://support.imtihan.tech/plan-help#premium-planlar%C4%B1n%C4%B1-iptal-etme"
                        />
                        <InfoCard
                            description="Premium planım doğru çalışmıyor. Ne yapmalıyım?"
                            link="https://support.imtihan.tech/plan-help#premium-%C3%A7al%C4%B1%C5%9Fm%C4%B1yor"
                        />
                        <InfoCard
                            description="Premium fiyatı neden arttı?"
                            link="https://support.imtihan.tech/payment-help#fiyat-g%C3%BCncellemeri"
                        />
                    </div>
                </div>
            </main>
        </>
    );
}
