import { ReactNode } from 'react';
import { Metadata } from 'next';
import GuestLayout from '@/layouts/GuestLayout';

export const metadata: Metadata = {
    title: 'Kayıt Ol',
};

export default function RegisterLayout(props: { children: ReactNode }) {
    return <GuestLayout>{props.children}</GuestLayout>;
}
