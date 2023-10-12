'use client';

import ApplicationLogo from '@/components/ApplicationLogo';
import AuthCard from '@/components/AuthCard';
import AuthSessionStatus from '@/components/AuthSessionStatus';
import Button from '@/components/Button';
import GuestLayout from '@/layouts/GuestLayout';
import Input from '@/components/elements/Input';
import InputError from '@/components/elements/InputError';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth';
import { useState } from 'react';
import Label from '@/components/Label';
import { useRouter } from 'next/navigation';

const ForgotPassword = () => {
    const { forgotPassword } = useAuth({ middleware: 'guest' });
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    const [email, setEmail] = useState<string>('');
    const [errors, setErrors] = useState<any>([]);
    const [status, setStatus] = useState(null);

    const submitForm = (event: { preventDefault: () => void }) => {
        event.preventDefault();

        forgotPassword({ email, setErrors, setStatus });
    };

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
                <div className="mb-4 text-sm text-zinc-600 dark:text-zinc-300">
                    Şifrenizi mi unuttunuz? Hiç sorun değil. Bize e-posta
                    adresinizi bildirin ve size şifre sıfırlama bağlantısı
                    içeren bir e-posta göndereceğiz. Bu bağlantı üzerinden yeni
                    bir şifre seçme imkanı bulacaksınız.
                </div>

                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={status} />

                <form onSubmit={submitForm}>
                    {/* Email Address */}
                    <div>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={email}
                            className="block mt-1 w-full"
                            placeholder="Eposta"
                            onChange={event => setEmail(event.target.value)}
                            required
                            autoFocus
                        />

                        <InputError messages={errors?.email} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <Label
                            onClick={handleGoBack}
                            className="cursor-pointer underline">
                            Vazgeç
                        </Label>

                        <Button>Eposta Şifre Sıfırlama Bağlantısı</Button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    );
};

export default ForgotPassword;
