'use client';

import React, { useState, useEffect, ReactNode } from 'react';

export const Progress = (): ReactNode => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const startLoading = () => setIsLoading(true);
        const stopLoading = () => setIsLoading(false);

        window.addEventListener('load', stopLoading);
        window.addEventListener('beforeunload', startLoading);

        return () => {
            window.removeEventListener('load', stopLoading);
            window.removeEventListener('beforeunload', startLoading);
        };
    }, []);

    return isLoading ? (
        <div className="bg-brand h-1 w-full fixed left-0 top-0 z-[100]" />
    ) : null;
};
