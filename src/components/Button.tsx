'use client';

import React from 'react';
import Label from '@/components/Label';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface IButtonProps {
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
    isLoading: boolean;
    children?: React.ReactNode;
}

export default function Button({
    type = 'submit',
    disabled = false,
    className,
    isLoading = false,
    children,
    ...props
}: IButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`${className} dark:text-white text-zinc-900 border border-brand hover:bg-brand hover:text-white transition-all rounded-lg px-4 py-2`}
            {...props}>
            {isLoading ? (
                <div className="inline-flex gap-1">
                    <ArrowPathIcon className="w-4 h-4 self-center animate-spin" />
                    <Label>Yükleniyor</Label>
                </div>
            ) : (
                children
            )}
        </button>
    );
}
