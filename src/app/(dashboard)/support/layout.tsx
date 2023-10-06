import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Destekler',
};
export default function SupportLayout(props: { children: ReactNode }) {
    return props.children;
}
