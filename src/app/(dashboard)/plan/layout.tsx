import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Planlar',
};
export default function PlanLayout(props: { children: ReactNode }) {
    return props.children;
}
