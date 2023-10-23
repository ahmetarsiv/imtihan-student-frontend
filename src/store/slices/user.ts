import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '@/store';
import axios from '@/lib/axios';
import { IUserResponse } from '@/types/IUser';

interface IUserState {
    isLoading: boolean;
    users: IUserResponse[];
    user: IUserResponse | null;
}

const initialState: IUserState = {
    isLoading: false,
    users: [] || null,
    user: null,
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
        getUser: (state, action: PayloadAction<IUserResponse>) => {
            state.isLoading = false;
            state.user = action.payload;
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
        },
    },
});

export default slice.reducer;

export const getUser = (id: number) => async (dispatch: AppDispatch) => {
    await dispatch(slice.actions.startLoading());
    try {
        const response = await axios.get('/api/student/accounts/' + id);
        dispatch(slice.actions.getUser(response.data));
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
