import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IRootState {
    root: {
        title: string;
    };
}

const initialState: IRootState = {
    root: {
        title: 'İmtihan',
    },
};

const slice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        setTitle: (state: any, action: PayloadAction<string>) => {
            state.root.title = action.payload;
        },
    },
});

export const { setTitle } = slice.actions;

export default slice.reducer;
