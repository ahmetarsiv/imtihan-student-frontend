'use client';

import React, { forwardRef, SelectHTMLAttributes, ReactNode, Ref } from 'react';

interface InputSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    disabled?: boolean;
    className?: string;
    defaultOption?: string;
    children: ReactNode;
}

const InputSelect = forwardRef(
    (
        {
            disabled = false,
            className,
            defaultOption,
            children,
            ...props
        }: InputSelectProps,
        ref: Ref<HTMLSelectElement>,
    ) => (
        <select
            ref={ref}
            disabled={disabled}
            className={`${className} w-full text-sm transition placeholder-transition hover:border-zinc-900 dark:hover:border-zinc-300 hover:placeholder-text-zinc-900 dark:hover:placeholder-text-zinc-300 focus:ring-transparent focus:border-zinc-900 dark:focus:border-zinc-300 dark:bg-black text-zinc-900 dark:text-zinc-300 focus:placeholder-text-zinc-900 dark:focus:placeholder-text-zinc-300 rounded-lg p-3`}
            {...props}>
            {defaultOption && <option>{defaultOption}</option>}
            {children}
        </select>
    ),
);

export default InputSelect;
