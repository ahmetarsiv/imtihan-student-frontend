'use client';

import Link from 'next/link';
import ApplicationLogo from '@/components/ApplicationLogo';

interface IFooterProps {
    className?: string;
}

export default function Footer({ className }: IFooterProps) {
    return (
        <footer className={`${className}`}>
            <Link href="/">
                <div className="flex justify-center">
                    <ApplicationLogo width={72} height={16} />
                </div>
            </Link>
        </footer>
    );
}
