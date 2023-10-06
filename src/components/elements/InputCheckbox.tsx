'use client';

import React, { forwardRef, InputHTMLAttributes, Ref } from 'react';

interface IInputCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

const InputCheckbox = forwardRef(
    (
        { className, ...props }: IInputCheckboxProps,
        ref: Ref<HTMLInputElement>,
    ) => (
        <input
            ref={ref}
            type={'checkbox'}
            {...props}
            className={`${className} transition text-brand bg-white focus:ring-brand dark:ring-offset-zinc-900 focus:ring-1 dark:bg-black hover:border-zinc-900 dark:hover:border-zinc-300 focus:border-zinc-900 dark:focus:border-zinc-300 rounded-lg p-2.5`}
        />
    ),
);

export default InputCheckbox;
