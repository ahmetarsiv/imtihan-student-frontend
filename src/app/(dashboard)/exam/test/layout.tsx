import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'İmtihan',
};
export default function ExamTestLayout(props: { children: ReactNode }) {
    return props.children;
}
