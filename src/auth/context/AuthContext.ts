import { createContext } from 'react';
import { IUserResponse } from '@/types/IUser';
import {
    IAuthUserResponse,
    IForgotPasswordForm,
    ILoginForm,
    IRegisterForm,
    IResetPasswordForm,
} from '@/types/IAuth';

export type AuthStatus = 'authenticated' | 'loading' | 'unauthenticated';

interface IAuthContext {
    user: IAuthUserResponse | null;
    status: AuthStatus;
    errorMessages: any | null;
    login: (data: ILoginForm) => Promise<any>;
    register: (data: IRegisterForm) => Promise<any>;
    resetPassword: (data: IResetPasswordForm) => Promise<any>;
    forgotPassword: (data: IForgotPasswordForm) => Promise<any>;
    resendEmailVerification: () => Promise<any>;
    logout: () => void;
    destroySession: () => void;
}

export const AuthContext = createContext<IAuthContext>({
    user: null,
    status: 'loading',
    errorMessages: null,
    login: (data: ILoginForm) => new Promise(() => {}),
    register: (data: IRegisterForm) => new Promise(() => {}),
    resetPassword: (data: IResetPasswordForm) => new Promise(() => {}),
    forgotPassword: (data: IForgotPasswordForm) => new Promise(() => {}),
    resendEmailVerification: () => new Promise(() => {}),
    logout() {},
    destroySession() {},
});
