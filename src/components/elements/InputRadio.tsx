'use client';

import React, { forwardRef, InputHTMLAttributes, Ref } from 'react';

interface InputRadioProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

const InputRadio = forwardRef(
    ({ className, ...props }: InputRadioProps, ref: Ref<HTMLInputElement>) => (
        <input
            ref={ref}
            type={'radio'}
            {...props}
            className={`${className} transition text-brand bg-white focus:ring-brand dark:ring-offset-zinc-900 focus:ring-1 dark:bg-black dark:border-zinc-600 hover:border-zinc-900 dark:hover:border-zinc-300 focus:border-zinc-900 dark:focus:border-zinc-300 rounded-full p-2.5`}
        />
    ),
);

export default InputRadio;
