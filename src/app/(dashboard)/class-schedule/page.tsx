'use client';

import { setTitle } from '@/store/slices/root';

import { ReactNode, useEffect } from 'react';
import Calendar from '@/components/Calendar';
import { AppDispatch, useDispatch } from '@/store';

export default function ClassSchedulePage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Ders Programları'));
    }, [dispatch]);

    return (
        <>
            <main>
                <div className="pb-7 -z-50">
                    <Calendar />
                </div>
            </main>
        </>
    );
}
