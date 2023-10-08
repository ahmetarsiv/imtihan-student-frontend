import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bildirimler',
};
export default function NotificationLayout(props: { children: ReactNode }) {
    return props.children;
}
