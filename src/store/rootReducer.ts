import { combineReducers, Reducer } from 'redux';
import note from '@/store/slices/note';
import support from '@/store/slices/support';
import announcement from '@/store/slices/announcement';
import classSchedule from '@/store/slices/classSchedule';

interface RootState {
    note: ReturnType<typeof note>;
    support: ReturnType<typeof support>;
    announcement: ReturnType<typeof announcement>;
    classSchedule: ReturnType<typeof classSchedule>;
}

const rootReducer: Reducer<RootState> = combineReducers({
    note,
    support,
    announcement,
    classSchedule,
});

export { rootReducer };
