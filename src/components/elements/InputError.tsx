'use client';

import React from 'react';

interface IInputErrorProps {
    messages?: string[];
    className?: string;
}

export default function InputError({
    messages = [],
    className = '',
}: IInputErrorProps) {
    return (
        <>
            {messages.length > 0 && (
                <>
                    {messages.map((message, index) => (
                        <p
                            className={`${className} text-sm text-red-600`}
                            key={index}>
                            {message}
                        </p>
                    ))}
                </>
            )}
        </>
    );
}
