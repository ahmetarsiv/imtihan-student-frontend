'use client';

import ApplicationLogo from '@/components/ApplicationLogo';
import AuthCard from '@/components/AuthCard';
import GuestLayout from '@/layouts/GuestLayout';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Input, Label } from '@codenteq/interfeys';
import { useAuthContext } from '@/auth/hooks/useAuthContext';
import GoogleAuthButton from '@/components/GoogleAuthButton';

const Register = () => {
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const { push } = useRouter();

    const { register, errorMessages } = useAuthContext();

    const [isRevealPassword] = useState(false);

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const submitForm = (event: { preventDefault: () => void }) => {
        setIsLoading(true);
        event.preventDefault();

        register({
            full_name: fullName,
            email,
            password,
            password_confirmation: passwordConfirmation,
        })
            .then(() => {
                setIsLoading(false);
                push('/');
            })
            .catch(() => setIsLoading(false));
    };

    useEffect(() => {
        if (searchParams.get('email')) {
            setEmail(searchParams.get('email') || '');
        }
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
                <div className="flex flex-col">
                    <p className="my-4 text-center text-sm">
                        Devam etmek için İmtihan'a kaydolun.
                    </p>

                    <GoogleAuthButton label="Google ile kaydolun"/>
                </div>

                <div className="inline-flex justify-center items-center w-full">
                    <hr className="my-8 h-px bg-zinc-200 border-0 dark:bg-zinc-700 w-full" />
                    <span className="absolute left-1/2 px-3 font-medium text-zinc-900 -translate-x-1/2 bg-white dark:text-white dark:bg-black">
                        veya
                    </span>
                </div>

                <form onSubmit={submitForm}>
                    {/* Name */}
                    <div>
                        <Input
                            id="full_name"
                            type="text"
                            value={fullName}
                            className="block mt-1 w-full"
                            placeholder="Tam adınız"
                            onChange={event => setFullName(event.target.value)}
                            required
                            autoFocus
                            messages={errorMessages?.name}
                        />
                    </div>

                    {/* Email Address */}
                    <div className="mt-4">
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            className="block mt-1 w-full"
                            placeholder="Eposta"
                            onChange={event => setEmail(event.target.value)}
                            required
                            messages={errorMessages?.email}
                        />
                    </div>

                    {/* Password */}
                    <div className="mt-4">
                        <Input
                            id="password"
                            type={isRevealPassword ? 'text' : 'password'}
                            value={password}
                            className="block mt-1 w-full pr-10"
                            placeholder="Şifre"
                            onChange={event => setPassword(event.target.value)}
                            required
                            autoComplete="new-password"
                            minLength={8}
                            messages={errorMessages?.password}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mt-4">
                        <Input
                            id="passwordConfirmation"
                            type={isRevealPassword ? 'text' : 'password'}
                            value={passwordConfirmation}
                            className="block mt-1 w-full"
                            placeholder="Şifreyi doğrulayın"
                            onChange={event =>
                                setPasswordConfirmation(event.target.value)
                            }
                            required
                            minLength={8}
                            messages={errorMessages?.password_confirmation}
                        />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <Label className="text-xs">
                            Kaydol'a tıklayarak İmtihan'ın{' '}
                            <Link
                                href="https://imtihantech.com/terms-of-services"
                                className="underline"
                                target="_blank">
                                Şartlarını
                            </Link>{' '}
                            ve{' '}
                            <Link
                                href="https://imtihantech.com/privacy-policy"
                                className="underline"
                                target="_blank">
                                Gizlilik Politikasını
                            </Link>{' '}
                            kabul ediyorum.
                        </Label>

                        <Button
                            isLoading={isLoading}
                            className="ml-4"
                            type={'submit'}
                            label={'Kaydol'}
                        />
                    </div>
                </form>

                <hr className="my-8 w-full h-px bg-zinc-200 border-0 dark:bg-zinc-700" />

                <div className="dark:bg-black w-full">
                    <div className="flex flex-col">
                        <p className="my-4 text-center text-sm text-zinc-900 dark:text-zinc-300">
                            Zaten kayıtlı mısınız?
                        </p>

                        <Link href="/auth/login">
                            <div className="dark:text-white text-zinc-900 border hover:border-brand font-medium rounded-full text-lg text-center py-2.5">
                                İmtihan için giriş yap.
                            </div>
                        </Link>
                    </div>
                </div>

                <Label className="text-center text-xs my-4">
                    Bu site CAPTCHA tarafından korunmaktadır ve CloudFlare{' '}
                    <Link
                        href="https://www.cloudflare.com/privacypolicy/"
                        className="underline"
                        target="_blank">
                        Gizlilik Politikası
                    </Link>{' '}
                    ile{' '}
                    <Link
                        href="https://www.cloudflare.com/website-terms/"
                        className="underline"
                        target="_blank">
                        Hizmet Koşulları
                    </Link>{' '}
                    geçerlidir.
                </Label>
            </AuthCard>
        </GuestLayout>
    );
};

export default Register;
