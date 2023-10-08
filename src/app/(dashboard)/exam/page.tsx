'use client';

import NoContentCard from '@/components/cards/NoContentCard';

import React, { ReactNode } from 'react';
import LottieAnimation from '@/components/LottieAnimation';
import Exam from '../../../../public/lottie/animation_llpjjjsc.json';

export default function ClassSchedulePage(): ReactNode {
    return (
        <>
            <main>
                <div>
                    <NoContentCard
                        className="col-span-full"
                        name="Hadi sınavınızı oluşturalım."
                        description="Zorluk serviyeleri, soru sayıları ve kayıtlı konulardan oluşan bir sınav oluşturun."
                        link={{
                            name: 'Sınav Oluştur',
                            href: '/exam/create',
                        }}>
                        <div className="h-72">
                            <LottieAnimation animationData={Exam} />
                        </div>
                    </NoContentCard>
                </div>
            </main>
        </>
    );
}
