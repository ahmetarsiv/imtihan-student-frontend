import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '@/store';
import axios from '@/lib/axios';
import { IBasePaginate, IPaginate } from '@/types/IPaginate';
import { IUserResponse } from '@/types/IUser';

interface IUserState {
    isLoading: boolean;
    users: IUserResponse[];
    user: IUserResponse | null;
    meta: IBasePaginate | null;
}

const initialState: IUserState = {
    isLoading: false,
    users: [] || null,
    user: null,
    meta: null,
};

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        endLoading: state => {
            state.isLoading = false;
        },
        getUsers: (state, action: PayloadAction<IPaginate<IUserResponse>>) => {
            state.isLoading = false;
            state.users = action.payload.data || [];
            state.meta = {
                current_page: action.payload.current_page,
                last_page: action.payload.last_page,
                total: action.payload.total,
                links: action.payload.links,
                from: action.payload.from,
                to: action.payload.to,
            };
        },
        getUser: (state, action: PayloadAction<IUserResponse>) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        postUser: (state, action: PayloadAction<IUserResponse>) => {
            state.isLoading = false;
            state.users = [action.payload, ...state.users];
        },
        updateUser: (state, action: PayloadAction<IUserResponse>) => {
            state.isLoading = false;
            state.users = [
                action.payload,
                ...state.users.filter(user => user.id !== action.payload.id),
            ];
        },
        deleteUser: (state, action: PayloadAction<IUserResponse>) => {
            state.isLoading = false;
            if (state.users) {
                state.users = state.users.filter(
                    user => user.id !== action.payload.id,
                );
            }
            if (state.meta) {
                state.meta.total = state.meta.total - 1;
            }
        },
    },
});

export default slice.reducer;

export const getUsers =
    (page: number = 1, query: string = '') =>
    async (dispatch: AppDispatch) => {
        await dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get(
                '/api/student/accounts?page=' + page + '&query=' + query,
            );
            dispatch(slice.actions.getUsers(response.data));
        } finally {
            dispatch(slice.actions.endLoading());
        }
    };

export const getUser = (id: number) => async (dispatch: AppDispatch) => {
    await dispatch(slice.actions.startLoading());
    try {
        const response = await axios.get('/api/student/accounts/' + id);
        dispatch(slice.actions.getUser(response.data));
    } finally {
        dispatch(slice.actions.endLoading());
    }
};

export const postUser = (data: FormData) => async (dispatch: AppDispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await axios.post('/api/student/accounts/', data);
        dispatch(slice.actions.postUser(response.data));
    } finally {
        dispatch(slice.actions.endLoading());
    }
};

export const updateUser =
    (id: number, data: FormData) => async (dispatch: AppDispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.put(
                '/api/student/accounts/' + id,
                data,
            );
            dispatch(slice.actions.updateUser(response.data));
        } finally {
            dispatch(slice.actions.endLoading());
        }
    };

export const deleteUser = (id: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.delete('/api/student/accounts/' + id);
        dispatch(slice.actions.deleteUser(response.data));
    } finally {
        dispatch(slice.actions.endLoading());
    }
};
