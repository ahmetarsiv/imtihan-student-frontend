import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Görüntüle',
};
export default function NoteViewLayout(props: { children: ReactNode }) {
    return props.children;
}
