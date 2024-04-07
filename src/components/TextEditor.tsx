'use client';

import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { Label } from '@codenteq/interfeys';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface ITextEditor {
    className?: string;
    value: string;
    label?: string;
    // eslint-disable-next-line no-unused-vars
    onChange: (content: string) => void;
    messages?: string | string[];
}

export default function TextEditor({
    className,
    value,
    label,
    onChange,
    messages = [],
    ...props
}: ITextEditor) {
    const handleEditorChange = (content: string) => {
        onChange(content);
    };

    return (
        <>
            {label && <Label>{label}</Label>}
            <ReactQuill
                className={`${className}`}
                {...props}
                theme="snow"
                value={value}
                onChange={handleEditorChange}
            />
            {messages.length > 0 && Array.isArray(messages) ? (
                <>
                    {messages.map((message, index) => (
                        <p className="text-sm text-red-600" key={index}>
                            {message}
                        </p>
                    ))}
                </>
            ) : (
                <p className="text-sm text-red-600">{messages}</p>
            )}
        </>
    );
}
