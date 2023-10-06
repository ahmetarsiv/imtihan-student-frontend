'use client';

import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

interface ITextEditor {
    className?: string;
    value: string;
    // eslint-disable-next-line no-unused-vars
    onChange: (content: string) => void;
}

export default function TextEditor({
    className,
    value,
    onChange,
    ...props
}: ITextEditor) {
    const handleEditorChange = (content: string) => {
        onChange(content);
    };

    return (
        <>
            <ReactQuill
                className={`${className}`}
                {...props}
                theme="snow"
                value={value}
                onChange={handleEditorChange}
            />
        </>
    );
}
