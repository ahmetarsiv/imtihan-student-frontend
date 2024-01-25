'use client';

import ApplicationLogo from '@/components/ApplicationLogo';
import React from 'react';
import Label from '@/components/Label';

interface IFooterProps {
    className?: string;
}

export default function Footer({ className }: IFooterProps) {
    const packageJson = require('/package.json');
    const version = packageJson.version;

    return (
        <footer className={`${className}`}>
            <div className="flex justify-between items-center p-5">
                <ApplicationLogo width={72} height={16} />
                <Label>version {version}</Label>
            </div>
        </footer>
    );
}
