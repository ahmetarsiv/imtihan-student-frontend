import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Düzenle',
};
export default function NoteEditLayout(props: { children: ReactNode }) {
    return props.children;
}
