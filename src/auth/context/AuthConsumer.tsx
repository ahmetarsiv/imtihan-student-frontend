'use client';

import { AuthContext } from './AuthContext';
import { ReactNode } from 'react';
import SplashScreen from '@/components/SplashScreen';

interface IAuthConsumerProps {
    children: ReactNode;
}

export function AuthConsumer({ children }: IAuthConsumerProps) {
    return (
        <AuthContext.Consumer>
            {auth => (auth.status == 'loading' ? <SplashScreen /> : children)}
        </AuthContext.Consumer>
    );
}
