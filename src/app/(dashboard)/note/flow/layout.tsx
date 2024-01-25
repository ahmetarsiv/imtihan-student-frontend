import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Akış',
};
export default function FlowLayout(props: { children: ReactNode }) {
    return props.children;
}
