'use client';

import { BellIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { Label } from '@codenteq/interfeys';

interface INotificationButtonProps {
    children: React.ReactNode;
}

export default function NotificationButton({
    children,
}: INotificationButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <div className="hidden lg:block">
                <div
                    className="fixed flex justify-center items-center top-2 right-4 backdrop-blur-sm bg-white/50 rounded-full w-9 h-9 dark:bg-black/20 z-[11] cursor-pointer"
                    onClick={toggleMenu}>
                    <BellIcon className="w-6 h-6 z-10 dark:text-white" />
                    <span className="animate-ping absolute top-2 right-2 block h-1 w-1 rounded-full ring-2 ring-brand bg-brand" />
                </div>

                {isOpen && (
                    <div className="fixed top-14 right-2 z-50 bg-white rounded-lg shadow-md backdrop-blur-sm bg-black/20 dark:bg-white/10">
                        <Label className="p-2">Bildirimler</Label>

                        <div className="grid grid-cols-1 gap-1">{children}</div>
                    </div>
                )}
            </div>
        </>
    );
}
