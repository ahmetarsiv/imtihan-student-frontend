import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '@/store';
import axios from '@/lib/axios';
import { IClassScheduleResponse } from '@/types/IClassSchedule';
import { IBasePaginate, IPaginate } from '@/types/IPaginate';

interface ClassScheduleState {
    isLoading: boolean;
    classSchedules: IClassScheduleResponse[];
    classSchedule: IClassScheduleResponse | null;
    meta: IBasePaginate | null;
}

const initialState: ClassScheduleState = {
    isLoading: false,
    classSchedules: [],
    classSchedule: null,
    meta: null,
};

const slice = createSlice({
    name: 'classSchedule',
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        endLoading: state => {
            state.isLoading = false;
        },
        getClassSchedules: (
            state,
            action: PayloadAction<IPaginate<IClassScheduleResponse>>,
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
        getClassSchedule: (
            state,
            action: PayloadAction<IClassScheduleResponse>,
        ) => {
            state.isLoading = false;
            state.classSchedule = action.payload;
        },
        postClassSchedule: (
            state,
            action: PayloadAction<IClassScheduleResponse>,
        ) => {
            state.isLoading = false;
            state.classSchedules = [action.payload, ...state.classSchedules];
        },
        updateClassSchedule: (
            state,
            action: PayloadAction<IClassScheduleResponse>,
        ) => {
            state.isLoading = false;
            state.classSchedules = [
                action.payload,
                ...state.classSchedules.filter(
                    classSchedule => classSchedule.id !== action.payload.id,
                ),
            ];
        },
        deleteClassSchedule: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.classSchedules = state.classSchedules.filter(
                classSchedule => classSchedule.id !== action.payload.id,
            );
            if (state.meta && state.meta.total) {
                state.meta.total = state.meta.total - 1;
            }
        },
    },
});

export default slice.reducer;

export const getClassSchedules = () => async (dispatch: AppDispatch) => {
    await dispatch(slice.actions.startLoading());
    try {
        const response = await axios.get('/api/student/class-schedules/');
        dispatch(slice.actions.getClassSchedules(response.data));
    } finally {
        dispatch(slice.actions.endLoading());
    }
};

export const getClassSchedule =
    (id: number) => async (dispatch: AppDispatch) => {
        await dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get(
                '/api/student/class-schedules/' + id,
            );
            dispatch(slice.actions.getClassSchedule(response.data));
        } finally {
            dispatch(slice.actions.endLoading());
        }
    };

export const postClassSchedule =
    (data: IClassScheduleResponse) => async (dispatch: AppDispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post(
                '/api/student/class-schedules/',
                data,
            );
            dispatch(slice.actions.postClassSchedule(response.data));
        } finally {
            dispatch(slice.actions.endLoading());
        }
    };

export const updateClassSchedule =
    (id: number, data: IClassScheduleResponse) =>
    async (dispatch: AppDispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.put(
                '/api/student/class-schedules/' + id,
                data,
            );
            dispatch(slice.actions.updateClassSchedule(response.data));
        } finally {
            dispatch(slice.actions.endLoading());
        }
    };

export const deleteClassSchedule =
    (id: number) => async (dispatch: AppDispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.delete(
                '/api/student/class-schedules/' + id,
            );
            dispatch(slice.actions.deleteClassSchedule(response.data));
        } finally {
            dispatch(slice.actions.endLoading());
        }
    };
