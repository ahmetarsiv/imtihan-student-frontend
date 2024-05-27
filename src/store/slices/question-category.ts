import { IQuestionCategory } from '@/types/IExam';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '@/store';
import axios from '@/lib/axios';

export interface IQuestionCategoryTree extends IQuestionCategory {
    parents: IQuestionCategoryTree[];
}

interface IQuestionCategoryState {
    isLoading: boolean;
    questionCategories: IQuestionCategoryTree[];
}

const initialState: IQuestionCategoryState = {
    isLoading: false,
    questionCategories: [],
};

const slice = createSlice({
    name: 'questionCategory',
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        endLoading: state => {
            state.isLoading = false;
        },
        getQuestionCategories: (
            state,
            action: PayloadAction<IQuestionCategoryTree[]>,
        ) => {
            state.isLoading = false;
            state.questionCategories = action.payload || [];
        },
    },
});

export default slice.reducer;

export function getQuestionCategories() {
    return async (dispatch: AppDispatch) => {
        await dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get(
                '/api/student/question-categories',
            );
            dispatch(slice.actions.getQuestionCategories(response.data));
        } finally {
            dispatch(slice.actions.endLoading());
        }
    };
}
