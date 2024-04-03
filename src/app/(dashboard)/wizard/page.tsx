'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { AppDispatch, useDispatch } from '@/store';
import { setTitle } from '@/store/slices/root';
import {
    CreditCardIcon,
    IdentificationIcon,
    MapPinIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Step1 from '@/app/(dashboard)/wizard/steps/step1';
import Step2 from '@/app/(dashboard)/wizard/steps/step2';
import Step3 from '@/app/(dashboard)/wizard/steps/step3';

export default function WizardPage(): ReactNode {
    const { push } = useRouter();
    const dispatch: AppDispatch = useDispatch();
    const [step, setStep] = useState(1);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrev = () => {
        setStep(step - 1);
    };

    const handleFinish = () => {
        push('');
        console.log('Wizard tamamlandı!');
    };

    useEffect(() => {
        dispatch(setTitle('Wizard'));
    }, [dispatch]);

    return (
        <>
            <ol className="flex items-center w-full">
                <li className="flex w-full items-center after:w-full dark:after:border-zinc-800 after:h-1 after:border-b after:border-4 after:inline-block">
                    <div
                        className={`flex items-center justify-center ${step === 1 ? 'bg-blue-100 dark:bg-blue-800' : 'bg-zinc-100 dark:bg-zinc-700'} rounded-full h-12 w-12 shrink-0`}>
                        <IdentificationIcon className="w-6 h-6 text-brand dark:text-white" />
                    </div>
                </li>
                <li className="flex w-full items-center after:w-full dark:after:border-zinc-800 after:h-1 after:border-b after:border-4 after:inline-block">
                    <div
                        className={`flex items-center justify-center ${step === 2 ? 'bg-blue-100 dark:bg-blue-800' : 'bg-zinc-100 dark:bg-zinc-700'} rounded-full h-12 w-12 shrink-0`}>
                        <MapPinIcon className="w-6 h-6 text-brand dark:text-white" />
                    </div>
                </li>
                <li className="flex items-center">
                    <div
                        className={`flex items-center justify-center ${step === 3 ? 'bg-blue-100 dark:bg-blue-800' : 'bg-zinc-100 dark:bg-zinc-700'} rounded-full h-12 w-12 shrink-0`}>
                        <CreditCardIcon className="w-6 h-6 text-brand dark:text-white" />
                    </div>
                </li>
            </ol>

            <div className="max-w-4xl">
                {step === 1 && <Step1 onNext={handleNext} />}
                {step === 2 && (
                    <Step2 onNext={handleNext} onPrev={handlePrev} />
                )}
                {step === 3 && (
                    <Step3 onPrev={handlePrev} onFinish={handleFinish} />
                )}
            </div>
        </>
    );
}
