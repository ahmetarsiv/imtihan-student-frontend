import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '@/store';
import axios from '@/lib/axios';
import { ICountryResponse } from '@/types/ICountry';

export interface ICountriesState {
    isLoading: boolean;
    countries: ICountryResponse[];
    country: ICountryResponse | null;
}

const initialState: ICountriesState = {
    isLoading: false,
    countries: [],
    country: null,
};

const slice = createSlice({
    name: 'country',
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        endLoading: state => {
            state.isLoading = false;
        },
        getCountries: (state, action: PayloadAction<ICountryResponse[]>) => {
            state.isLoading = false;
            state.countries = action.payload || [];
        },
    },
});

export default slice.reducer;

export function getCountries() {
    return async (dispatch: AppDispatch) => {
        await dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/api/student/countries/');
            dispatch(slice.actions.getCountries(response.data));
        } finally {
            dispatch(slice.actions.endLoading());
        }
    };
}
