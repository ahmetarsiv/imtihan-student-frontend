import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Wizard',
};
export default function WizardLayout(props: { children: ReactNode }) {
    return props.children;
}
