import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Notlar',
};
export default function NoteLayout(props: { children: ReactNode }) {
    return props.children;
}
