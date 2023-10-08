'use client';

import React, { ReactNode } from 'react';

interface IAuthCardProps {
    logo: ReactNode;
    children: ReactNode;
}

export default function AuthCard({ logo, children }: IAuthCardProps) {
    return (
        <>
            <div className="flex justify-center pb-10 w-screen">{logo}</div>

            <div className="w-96 px-2">{children}</div>
        </>
    );
}
