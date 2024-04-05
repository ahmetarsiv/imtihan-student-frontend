import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '@/lib/axios';
import { IExamAnswer, IExamForm, IExamResponse } from '@/types/IExam';

export interface IExam {
    isLoading: boolean;
    exam: IExamResponse | null;
}

const initialState: IExam = {
    isLoading: false,
    exam: null,
};

const slice = createSlice({
    name: 'exam',
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        endLoading: state => {
            state.isLoading = false;
        },
        create: (state, action: PayloadAction<IExamResponse>) => {
            state.isLoading = false;
            state.exam = action.payload;
        },
    },
});

export default slice.reducer;

export function createExam(data: IExamForm) {
    return async (dispatch: any) => {
        await dispatch(slice.actions.startLoading());
        try {
            const res = await axios.post('/api/student/exams/', data);
            dispatch(slice.actions.create(res.data));
        } catch (error) {
            dispatch(slice.actions.endLoading());
        }
    };
}

export function storeAnswer(exam_id: number, data: IExamAnswer[]) {
    return async (dispatch: any) => {
        await dispatch(slice.actions.startLoading());
        try {
            await axios.post('/api/student/exams/' + exam_id + '/answer', {
                answers: data,
            });
            dispatch(slice.actions.endLoading());
        } catch (error) {
            dispatch(slice.actions.endLoading());
        }
    };
}

export function deleteExam(exam_id: number) {
    return async (dispatch: any) => {
        await dispatch(slice.actions.startLoading());
        try {
            await axios.delete('/api/student/exams/' + exam_id);
            dispatch(slice.actions.endLoading());
        } catch (error) {
            dispatch(slice.actions.endLoading());
        }
    };
}
