import { ReactNode } from 'react';
import AppLayout from '@/layouts/AppLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ana Sayfa',
};
export default function DashboardLayout(props: { children: ReactNode }) {
    return <AppLayout>{props.children}</AppLayout>;
}
