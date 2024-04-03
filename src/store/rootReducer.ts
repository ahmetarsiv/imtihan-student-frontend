import { combineReducers, Reducer } from 'redux';
import user from '@/store/slices/user';
import note from '@/store/slices/note';
import support from '@/store/slices/support';
import announcement from '@/store/slices/announcement';
import classSchedule from '@/store/slices/classSchedule';
import country from '@/store/slices/country';
import city from '@/store/slices/city';
import state from '@/store/slices/state';
import staticPage from '@/store/slices/static-page';
import root from '@/store/slices/root';
import examType from '@/store/slices/exam-type';
import exam from '@/store/slices/exam';

export interface IRootState {
    root: ReturnType<typeof root>;
    user: ReturnType<typeof user>;
    note: ReturnType<typeof note>;
    exam: ReturnType<typeof exam>;
    examType: ReturnType<typeof examType>;
    support: ReturnType<typeof support>;
    announcement: ReturnType<typeof announcement>;
    classSchedule: ReturnType<typeof classSchedule>;
    country: ReturnType<typeof country>;
    city: ReturnType<typeof city>;
    state: ReturnType<typeof state>;
    staticPage: ReturnType<typeof staticPage>;
}

const rootReducer: Reducer<IRootState> = combineReducers({
    root,
    user,
    note,
    exam,
    examType,
    support,
    announcement,
    classSchedule,
    country,
    city,
    state,
    staticPage,
});

export { rootReducer };
