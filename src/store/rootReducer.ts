import { combineReducers, Reducer } from 'redux';
import user from '@/store/slices/user';
import note from '@/store/slices/note';
import support from '@/store/slices/support';
import announcement from '@/store/slices/announcement';
import classSchedule from '@/store/slices/classSchedule';
import country from '@/store/slices/country';
import city from '@/store/slices/city';
import state from '@/store/slices/state';

interface RootState {
    user: ReturnType<typeof user>;
    note: ReturnType<typeof note>;
    support: ReturnType<typeof support>;
    announcement: ReturnType<typeof announcement>;
    classSchedule: ReturnType<typeof classSchedule>;
    country: ReturnType<typeof country>;
    city: ReturnType<typeof city>;
    state: ReturnType<typeof state>;
}

const rootReducer: Reducer<RootState> = combineReducers({
    user,
    note,
    support,
    announcement,
    classSchedule,
    country,
    city,
    state,
});

export { rootReducer };
