import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Hesap',
};
export default function AccountLayout(props: { children: ReactNode }) {
    return props.children;
}
