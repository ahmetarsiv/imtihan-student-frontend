import {
    IExamResultDetailResponse,
    IExamResultResponse,
} from '@/types/IExamResult';
import { IBasePaginate, IPaginate } from '@/types/IPaginate';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '@/lib/axios';

export interface ExamResultType {
    isLoading: boolean;
    examResults: IExamResultResponse[];
    examResult: IExamResultDetailResponse | null;
    meta: IBasePaginate;
}

const initialState: ExamResultType = {
    isLoading: false,
    examResults: [],
    examResult: null,
    meta: {
        current_page: 1,
        last_page: 1,
        total: 0,
        links: {},
        from: 0,
        to: 0,
    },
};

const slice = createSlice({
    name: 'examResult',
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        endLoading: state => {
            state.isLoading = false;
        },
        getExamResults: (
            state,
            action: PayloadAction<IPaginate<IExamResultResponse>>,
        ) => {
            state.isLoading = false;
            state.examResults = action.payload.data || [];
            state.meta = {
                current_page: action.payload.current_page,
                last_page: action.payload.last_page,
                total: action.payload.total,
                links: action.payload.links,
                from: action.payload.from,
                to: action.payload.to,
            };
        },
        getExamResult: (
            state,
            action: PayloadAction<IExamResultDetailResponse>,
        ) => {
            state.isLoading = false;
            state.examResult = action.payload;
        },
    },
});

export default slice.reducer;

export function getExamResults() {
    return async (dispatch: any) => {
        await dispatch(slice.actions.startLoading());
        try {
            const res = await axios.get('/api/student/exams/results');
            dispatch(slice.actions.getExamResults(res.data));
        } catch (error) {
            dispatch(slice.actions.endLoading());
        }
    };
}

export function getExamResult(id: number) {
    return async (dispatch: any) => {
        await dispatch(slice.actions.startLoading());
        try {
            const res = await axios.get('/api/student/exams/results/' + id);
            dispatch(slice.actions.getExamResult(res.data));
        } catch (error) {
            dispatch(slice.actions.endLoading());
        }
    };
}
