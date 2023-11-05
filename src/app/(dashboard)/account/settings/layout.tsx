import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Hesap Ayarları',
};
export default function AccountSettingsLayout(props: { children: ReactNode }) {
    return props.children;
}
