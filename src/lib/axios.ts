import Axios, { AxiosInstance } from 'axios';

const axios: AxiosInstance = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true,
});

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 403) {
            axios.post('/logout').then(() => {
                window.location.href = '/auth/login';
            });
        }

        return Promise.reject(error);
    },
);

export default axios;
