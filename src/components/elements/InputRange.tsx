'use client';

import React, { ChangeEvent } from 'react';

interface IInputRangeProps {
    min: number;
    max: number;
    value: number;
    // eslint-disable-next-line no-unused-vars
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputRange({
    min,
    max,
    value,
    onChange,
}: IInputRangeProps) {
    return (
        <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={onChange}
            className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer dark:bg-zinc-700"
        />
    );
}
