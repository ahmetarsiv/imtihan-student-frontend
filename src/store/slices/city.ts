import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '@/store';
import axios from '@/lib/axios';
import { ICityResponse } from '@/types/ICity';

export interface ICitiesState {
    isLoading: boolean;
    cities: ICityResponse[];
    city: ICityResponse | null;
}

const initialState: ICitiesState = {
    isLoading: false,
    cities: [],
    city: null,
};

const slice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        endLoading: state => {
            state.isLoading = false;
        },
        getCities: (state, action: PayloadAction<ICityResponse[]>) => {
            state.isLoading = false;
            state.cities = action.payload || [];
        },
    },
});

export default slice.reducer;

export function getCities() {
    return async (dispatch: AppDispatch) => {
        await dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/api/student/cities/');
            dispatch(slice.actions.getCities(response.data));
        } finally {
            dispatch(slice.actions.endLoading());
        }
    };
}
