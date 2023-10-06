import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Duyurular',
};
export default function AnnouncementLayout(props: { children: ReactNode }) {
    return props.children;
}
