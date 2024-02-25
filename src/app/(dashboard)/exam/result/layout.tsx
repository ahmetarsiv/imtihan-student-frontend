import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sonuçlarım',
};
export default function ResultLayout(props: { children: ReactNode }) {
    return props.children;
}
