import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '@/store';
import axios from '@/lib/axios';
import { IAnnouncementResponse } from '@/types/IAnnouncement';
import { IBasePaginate, IPaginate } from '@/types/IPaginate';

interface AnnouncementState {
    isLoading: boolean;
    announcements: IAnnouncementResponse[];
    announcement: IAnnouncementResponse | null;
    meta: IBasePaginate | null;
}

const initialState: AnnouncementState = {
    isLoading: false,
    announcements: [],
    announcement: null,
    meta: null,
};

const slice = createSlice({
    name: 'announcement',
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        endLoading: state => {
            state.isLoading = false;
        },
        getAnnouncements: (
            state,
            action: PayloadAction<IPaginate<IAnnouncementResponse>>,
        ) => {
            state.isLoading = false;
            state.announcements = action.payload.data || [];
            state.meta = {
                current_page: action.payload.current_page,
                last_page: action.payload.last_page,
                total: action.payload.total,
                links: action.payload.links,
                from: action.payload.from,
                to: action.payload.to,
            };
        },
        getAnnouncement: (
            state,
            action: PayloadAction<IAnnouncementResponse>,
        ) => {
            state.isLoading = false;
            state.announcement = action.payload;
        },
    },
});

export default slice.reducer;

export const getAnnouncements = () => async (dispatch: AppDispatch) => {
    await dispatch(slice.actions.startLoading());
    try {
        const response = await axios.get('/api/student/announcements/');
        dispatch(slice.actions.getAnnouncements(response.data));
    } finally {
        dispatch(slice.actions.endLoading());
    }
};

export const getAnnouncement =
    (id: number) => async (dispatch: AppDispatch) => {
        await dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get(
                '/api/student/announcements/' + id,
            );
            dispatch(slice.actions.getAnnouncement(response.data));
        } finally {
            dispatch(slice.actions.endLoading());
        }
    };
