'use client';

import React from 'react';

interface IAuthSessionStatusProps {
    status?: string | null;
    className?: string;
}

export default function AuthSessionStatus({
    status,
    className,
    ...props
}: IAuthSessionStatusProps) {
    return (
        <>
            {status && (
                <div
                    className={`${className} font-medium text-sm text-green-600`}
                    {...props}>
                    {status}
                </div>
            )}
        </>
    );
}
