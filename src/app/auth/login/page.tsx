'use client';

import ApplicationLogo from '@/components/ApplicationLogo';
import AuthCard from '@/components/AuthCard';
import AuthSessionStatus from '@/components/AuthSessionStatus';
import GuestLayout from '@/layouts/GuestLayout';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button, Input, Label, Switch } from '@codenteq/interfeys';

export default function LoginPage() {
    const params = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`;
    };

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    });

    const [isRevealPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [shouldRemember, setShouldRemember] = useState(false);
    const [errors, setErrors] = useState<any>([]);
    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        const reset = params.get('reset');
        if (reset && reset.length > 0 && errors.length === 0) {
            setStatus(atob(reset as string));
        } else {
            setStatus(null);
        }
    }, []);

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        event.preventDefault();

        await login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        });
    };

    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <div>
                            <ApplicationLogo width={144} height={32} />
                        </div>
                    </Link>
                }>
                <div className="flex flex-col">
                    <p className="my-4 text-center text-sm">
                        Devam etmek için lütfen İmtihan'a giriş yapın.
                    </p>

                    <button onClick={handleGoogleLogin}>
                        <div className="w-full border hover:border-brand dark:bg-[#fff] dark:hover:bg-[#e5e7eb]/90 rounded-full text-lg px-5 py-2.5 inline-flex items-center mb-2">
                            <svg
                                className="text-black mr-2 -ml-1 w-4 h-4"
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fab"
                                data-icon="google"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 488 512">
                                <path
                                    fill="currentColor"
                                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                                />
                            </svg>
                            <span className="text-black text-center font-medium">
                                Google ile giriş yapın.
                            </span>
                        </div>
                    </button>
                </div>

                <div className="inline-flex justify-center items-center w-full">
                    <hr className="my-8 h-px bg-zinc-200 border-0 dark:bg-zinc-700 w-full" />
                    <span className="absolute left-1/2 px-3 font-medium text-zinc-900 -translate-x-1/2 bg-white dark:text-white dark:bg-black">
                        veya
                    </span>
                </div>

                <form onSubmit={submitForm}>
                    {/* Email Address */}
                    <div>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            className="block mt-1 w-full"
                            placeholder="E-posta adresi veya kullanıcı adı"
                            onChange={event => setEmail(event.target.value)}
                            required
                            autoFocus
                            messages={errors?.email}
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
                            autoComplete="current-password"
                            messages={errors.password}
                        />

                        {/* Session Status */}
                        <AuthSessionStatus className="mt-4" status={status} />
                    </div>

                    {/* Remember Me */}
                    <div className="block mt-4">
                        <Switch
                            type={'checkbox'}
                            id="remember_me"
                            name="remember"
                            label="Beni hatırla"
                            onChange={event =>
                                setShouldRemember(event.target.checked)
                            }
                        />
                    </div>

                    {/* Button */}
                    <div className="flex items-center justify-between mt-4">
                        <Link href="/auth/forgot-password">
                            <span className="underline text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-500">
                                Şifrenizi mi unuttunuz?
                            </span>
                        </Link>

                        <Button
                            isLoading={isLoading}
                            type={'submit'}
                            label={'Giriş yap'}
                        />
                    </div>
                </form>

                <hr className="my-8 w-full h-px bg-zinc-200 border-0 dark:bg-zinc-700" />

                <div className="dark:bg-black w-full">
                    <div className="flex flex-col">
                        <p className="my-4 text-center text-sm text-zinc-900 dark:text-zinc-300">
                            Hesabınız yok mu?
                        </p>

                        <Link href="/auth/register">
                            <div className="dark:text-white text-zinc-900 border hover:border-brand font-medium rounded-full text-lg text-center py-2.5">
                                İmtihan için kaydolun.
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
}
