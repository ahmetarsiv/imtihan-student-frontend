import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ders Programları',
};
export default function ClassScheduleLayout(props: { children: ReactNode }) {
    return props.children;
}
