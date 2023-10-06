import { ReactNode } from 'react';
import { Metadata } from 'next';
import GuestLayout from '@/layouts/GuestLayout';

export const metadata: Metadata = {
    title: 'Giriş Yap',
};

export default function LoginLayout(props: { children: ReactNode }) {
    return <GuestLayout>{props.children}</GuestLayout>;
}
