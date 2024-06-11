'use client';

import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function InviteFriends() {
    const shareConfig = {
        title: 'İmtihan',
        text: "Arkadaşını imtihan'a davet et, kazan!",
        url: 'https://open.imtihantech.com/auth/register',
    };

    const share = async () => {
        if (navigator.share) {
            try {
                await navigator.share(shareConfig);
                console.log('Başarıyla paylaşıldı');
            } catch (error) {
                console.error('Paylaşım başarısız: ', error);
            }
        } else if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(shareConfig.url);
            toast.success('Başarıyla kopyalandı!');
        } else {
            toast.error(
                'Maalesef paylaşım yapılamadı. Lütfen bağlantıyı manuel kopyalayınız.',
            );
        }
    };

    return (
        <div className="flex items-center justify-between h-32 w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-950">
            <div className="flex flex-col justify-center h-full p-4">
                <h2 className="text-xl dark:text-white">
                    Arkadaşını{' '}
                    <span className="font-bold text-brand">imtihan</span>'a
                    davet et, kazan!
                </h2>
            </div>
            <button
                onClick={share}
                className="flex items-center justify-center h-full bg-brand p-4">
                <ChevronRightIcon className="text-white w-6 h-6" />
            </button>
        </div>
    );
}
