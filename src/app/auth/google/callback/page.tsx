'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from '@/lib/axios';

export default function CallbackPage() {
    const params = useParams();

    useEffect(async () => {
        await axios.post('api/auth/google', { token: params.code });
    });

    return <div> Yönlendiriliyorsunuz...</div>;
}
