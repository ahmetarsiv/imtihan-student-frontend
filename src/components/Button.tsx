'use client';

import React from 'react';

interface IButtonProps {
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
}

export default function Button({
    type = 'submit',
    disabled = false,
    className,
    ...props
}: IButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`${className} dark:text-white text-zinc-900 border border-brand hover:bg-brand hover:text-white transition-all rounded-lg px-4 py-2`}
            {...props}
        />
    );
}
