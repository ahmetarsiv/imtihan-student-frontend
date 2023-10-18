import useSWR from 'swr';
import axios from '@/lib/axios';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface IUser {
    id: number;
    full_name: string;
    address: string;
    avatar: string;
    gender: number;
    email: string;
    phone: string;
    city_id: number;
    country_id: number;
    email_verified_at: Date;
    is_active: boolean;
    language_id: number;
    role: string;
    state_id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}

export interface AuthHook {
    user: IUser | null;
    // eslint-disable-next-line no-unused-vars
    register: (args: any) => Promise<void>;
    // eslint-disable-next-line no-unused-vars
    login: (args: any) => Promise<void>;
    // eslint-disable-next-line no-unused-vars
    forgotPassword: (args: any) => Promise<void>;
    // eslint-disable-next-line no-unused-vars
    resetPassword: (args: any) => Promise<void>;
    // eslint-disable-next-line no-unused-vars
    resendEmailVerification: (args: any) => void;
    logout: () => Promise<void>;
}

interface IAuthProps {
    middleware?: string;
    redirectIfAuthenticated?: string;
}

export const useAuth = ({
    middleware,
    redirectIfAuthenticated,
}: IAuthProps = {}): AuthHook => {
    const router = useRouter();
    const params = useParams();

    const {
        data: user,
        error,
        mutate,
    } = useSWR<IUser | null>('/api/user', () =>
        axios
            .get('/api/user')
            .then((res: any) => res.data)
            .catch((error: any) => {
                if (error.response.status !== 409) throw error;

                router.push('/auth/verify-email');
            }),
    );

    const csrf = async () => {
        await axios.get('/sanctum/csrf-cookie');
    };

    const register = async ({ setErrors, ...props }: any) => {
        await csrf();

        try {
            await axios.post('/register', props);
            mutate();
        } catch (error: any) {
            if (error.response.status !== 422) throw error;

            setErrors(error.response.data.errors);
        }
    };

    const login = async ({ setErrors, setStatus, ...props }: any) => {
        await csrf();

        setErrors([]);
        setStatus(null);

        try {
            await axios.post('/login', props);
            mutate();
        } catch (error: any) {
            if (error.response.status !== 422) throw error;

            setErrors(error.response.data.errors);
        }
    };

    const forgotPassword = async ({ setErrors, setStatus, email }: any) => {
        await csrf();

        setErrors([]);
        setStatus(null);

        try {
            const response = await axios.post('/forgot-password', { email });
            setStatus(response.data.status);
        } catch (error: any) {
            if (error.response.status !== 422) throw error;

            setErrors(error.response.data.errors);
        }
    };

    const resetPassword = async ({ setErrors, setStatus, ...props }: any) => {
        await csrf();

        setErrors([]);
        setStatus(null);

        try {
            const response = await axios.post('/reset-password', {
                token: params.token,
                ...props,
            });
            router.push('/auth/login?reset=' + btoa(response.data.status));
        } catch (error: any) {
            if (error.response.status !== 422) throw error;

            setErrors(error.response.data.errors);
        }
    };

    const resendEmailVerification = ({ setStatus }: any) => {
        axios
            .post('/email/verification-notification')
            .then((response: any) => setStatus(response.data.status));
    };

    const logout = async () => {
        if (!error) {
            await axios.post('/logout');
            mutate();
        }

        window.location.pathname = '/auth/login';
    };
    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated);
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated || '/');

        if (middleware === 'auth' && error) logout();
    }, [user, error]);

    return <AuthHook>{
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    };
};
