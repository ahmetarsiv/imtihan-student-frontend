import { IExamTypeResponse } from '@/types/IExamType';
import { IBasePaginate } from '@/types/IPaginate';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '@/lib/axios';

export interface IExamType {
    isLoading: boolean;
    examTypes: IExamTypeResponse[];
    meta: IBasePaginate | null;
}

const initialState: IExamType = {
    isLoading: false,
    examTypes: [],
    meta: null,
};

const slice = createSlice({
    name: 'examType',
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        endLoading: state => {
            state.isLoading = false;
        },
        getExamTypes: (state, action: PayloadAction<IExamTypeResponse[]>) => {
            state.isLoading = false;
            state.examTypes = action.payload;
        },
    },
});

export default slice.reducer;

export function getExamTypes() {
    return async (dispatch: any) => {
        await dispatch(slice.actions.startLoading());
        try {
            const res = await axios.get('/api/student/exam-types/');
            dispatch(slice.actions.getExamTypes(res.data));
        } catch (error) {
            dispatch(slice.actions.endLoading());
        }
    };
}
