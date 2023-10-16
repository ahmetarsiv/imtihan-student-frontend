import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '@/store';
import axios from '@/lib/axios';
import { IStateResponse } from '@/types/IState';

export interface IStatesState {
    isLoading: boolean;
    states: IStateResponse[];
    state: IStateResponse | null;
}

const initialState: IStatesState = {
    isLoading: false,
    states: [],
    state: null,
};

const slice = createSlice({
    name: 'state',
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        endLoading: state => {
            state.isLoading = false;
        },
        getStates: (state, action: PayloadAction<IStateResponse[]>) => {
            state.isLoading = false;
            state.states = action.payload || [];
        },
    },
});

export default slice.reducer;

export function getStates() {
    return async (dispatch: AppDispatch) => {
        await dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/api/student/states/');
            dispatch(slice.actions.getStates(response.data));
        } finally {
            dispatch(slice.actions.endLoading());
        }
    };
}
