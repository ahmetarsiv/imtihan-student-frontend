import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sınavlar',
};
export default function ExamLayout(props: { children: ReactNode }) {
    return props.children;
}
