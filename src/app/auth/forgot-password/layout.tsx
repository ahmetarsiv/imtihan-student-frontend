import { ReactNode } from 'react';
import { Metadata } from 'next';
import GuestLayout from '@/layouts/GuestLayout';

export const metadata: Metadata = {
    title: 'Parolanızı mı unuttunuz?',
};

export default function ForgotPasswordLayout(props: { children: ReactNode }) {
    return <GuestLayout>{props.children}</GuestLayout>;
}
