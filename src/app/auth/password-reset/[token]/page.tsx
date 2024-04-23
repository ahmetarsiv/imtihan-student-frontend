'use client';

import ApplicationLogo from '@/components/ApplicationLogo';
import AuthCard from '@/components/AuthCard';
import AuthSessionStatus from '@/components/AuthSessionStatus';
import GuestLayout from '@/layouts/GuestLayout';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button, Input } from '@codenteq/interfeys';
import { useAuthContext } from '@/auth/hooks/useAuthContext';

const PasswordReset = () => {
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    const { resetPassword, status, errorMessages } = useAuthContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const submitForm = (event: React.FormEvent) => {
        setIsLoading(true);
        event.preventDefault();

        resetPassword({
            email,
            password,
            password_confirmation: passwordConfirmation,
        })
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
    };

    useEffect(() => {
        setEmail(searchParams.get('email') || '');
    }, [searchParams.get('email')]);

    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <span>
                            <ApplicationLogo width={144} height={32} />
                        </span>
                    </Link>
                }>
                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={status} />

                <form onSubmit={submitForm}>
                    {/* Email Address */}
                    <div>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            className="block mt-1 w-full"
                            placeholder="Eposta"
                            onChange={event => setEmail(event.target.value)}
                            required
                            autoFocus
                            messages={errorMessages.email}
                        />
                    </div>

                    {/* Password */}
                    <div className="mt-4">
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            className="block mt-1 w-full"
                            placeholder="Şifre"
                            onChange={event => setPassword(event.target.value)}
                            required
                            messages={errorMessages.password}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mt-4">
                        <Input
                            id="passwordConfirmation"
                            type="password"
                            value={passwordConfirmation}
                            className="block mt-1 w-full"
                            placeholder="Şifreyi Onayla"
                            onChange={event =>
                                setPasswordConfirmation(event.target.value)
                            }
                            required
                            messages={errorMessages.password_confirmation}
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Button
                            isLoading={isLoading}
                            type={'submit'}
                            label={'Şifreyi Sıfırla'}
                        />
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    );
};

export default PasswordReset;
