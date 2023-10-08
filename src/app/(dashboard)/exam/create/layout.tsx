import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Oluştur',
};
export default function NoteCreateLayout(props: { children: ReactNode }) {
    return props.children;
}
