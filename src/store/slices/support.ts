import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '@/store';
import axios from '@/lib/axios';
import { ISupportForm, ISupportResponse } from '@/types/ISupport';
import { IBasePaginate, IPaginate } from '@/types/IPaginate';

export interface SupportState {
    isLoading: boolean;
    supports: ISupportResponse[];
    support: ISupportResponse | null;
    meta: IBasePaginate | null;
}

const initialState: SupportState = {
    isLoading: false,
    supports: [],
    support: null,
    meta: null,
};

const slice = createSlice({
    name: 'support',
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        endLoading: state => {
            state.isLoading = false;
        },
        getSupports: (
            state,
            action: PayloadAction<IPaginate<ISupportResponse>>,
        ) => {
            state.isLoading = false;
            state.meta = {
                current_page: action.payload.current_page,
                last_page: action.payload.last_page,
                total: action.payload.total,
                links: action.payload.links,
                from: action.payload.from,
                to: action.payload.to,
            };
        },
        getSupport: (state, action: PayloadAction<ISupportResponse>) => {
            state.isLoading = false;
            state.support = action.payload;
        },
        postSupport: (state, action: PayloadAction<ISupportResponse>) => {
            state.isLoading = false;
            state.supports = [action.payload, ...state.supports];
        },
        updateSupport: (state, action: PayloadAction<ISupportResponse>) => {
            state.isLoading = false;
            state.supports = [
                action.payload,
                ...state.supports.filter(
                    support => support.id !== action.payload.id,
                ),
            ];
        },
        deleteSupport: (state, action: PayloadAction<{ id: number }>) => {
            state.isLoading = false;
            state.supports = state.supports.filter(
                support => support.id !== action.payload.id,
            );
            if (state.meta && state.meta.total) {
                state.meta.total = state.meta.total - 1;
            }
        },
    },
});

export default slice.reducer;

export const getSupports =
    (page = 1, query = '') =>
    async (dispatch: AppDispatch) => {
        await dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get(
                '/api/student/supports?page=' + page + '&query=' + query,
            );
            dispatch(slice.actions.getSupports(response.data));
        } finally {
            dispatch(slice.actions.endLoading());
        }
    };

export const getSupport = (id: number) => async (dispatch: AppDispatch) => {
    await dispatch(slice.actions.startLoading());
    try {
        const response = await axios.get('/api/student/supports/' + id);
        dispatch(slice.actions.getSupport(response.data));
    } finally {
        dispatch(slice.actions.endLoading());
    }
};

export const postSupport =
    (data: ISupportForm) => async (dispatch: AppDispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post('/api/student/supports/', data);
            dispatch(slice.actions.postSupport(response.data));
        } finally {
            dispatch(slice.actions.endLoading());
        }
    };

export const updateSupport =
    (id: number, data: ISupportForm) => async (dispatch: AppDispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.put(
                '/api/student/supports/' + id,
                data,
            );
            dispatch(slice.actions.updateSupport(response.data));
        } finally {
            dispatch(slice.actions.endLoading());
        }
    };

export const deleteSupport = (id: number) => async (dispatch: AppDispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await axios.delete('/api/student/supports/' + id);
        dispatch(slice.actions.deleteSupport(response.data));
    } finally {
        dispatch(slice.actions.endLoading());
    }
};
