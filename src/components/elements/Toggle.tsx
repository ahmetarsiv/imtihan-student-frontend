'use client';

import React, { forwardRef, InputHTMLAttributes, Ref } from 'react';

interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
    disabled?: boolean;
    className?: string;
}

const Toggle = forwardRef(
    (
        { disabled = false, className, ...props }: ToggleProps,
        ref: Ref<HTMLInputElement>,
    ) => (
        <label className="relative inline-flex items-center mr-5 cursor-pointer">
            <input
                ref={ref}
                {...props}
                disabled={disabled}
                type="checkbox"
                className={`${className} sr-only peer`}
            />
            <div className="w-11 h-6 bg-zinc-300 rounded-full peer dark:bg-zinc-900 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-brand" />
        </label>
    ),
);

export default Toggle;
