import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Muin',
};
export default function MuinLayout(props: { children: ReactNode }) {
    return props.children;
}
