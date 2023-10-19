import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '@/store';
import axios from '@/lib/axios';
import { IStaticPageResponse } from '@/types/IStaticPage';

interface IStaticPageState {
    isLoading: boolean;
    staticPages: IStaticPageResponse[];
    staticPage: IStaticPageResponse | null;
}

const initialState: IStaticPageState = {
    isLoading: false,
    staticPages: [],
    staticPage: null,
};

const slice = createSlice({
    name: 'staticPage',
    initialState,

    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        endLoading: state => {
            state.isLoading = false;
        },
        getStaticPages: (
            state,
            action: PayloadAction<IStaticPageResponse[]>,
        ) => {
            state.isLoading = false;
            state.staticPages = action.payload || [];
        },
        getStaticPage: (state, action: PayloadAction<IStaticPageResponse>) => {
            state.isLoading = false;
            state.staticPage = action.payload;
        },
    },
});

export default slice.reducer;

export function getStaticPages() {
    return async (dispatch: AppDispatch) => {
        await dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/api/student/static-pages/');
            dispatch(slice.actions.getStaticPages(response.data));
        } finally {
            dispatch(slice.actions.endLoading());
        }
    };
}

export const getStaticPage = (id: number) => async (dispatch: AppDispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const res = await axios.get('/api/student/static-pages/' + id);
        dispatch(slice.actions.getStaticPage(res.data));
    } finally {
        dispatch(slice.actions.endLoading());
    }
};
