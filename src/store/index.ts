import { configureStore } from '@reduxjs/toolkit';
import {
    useDispatch as useAppDispatch,
    useSelector as useAppSelector,
    TypedUseSelectorHook,
} from 'react-redux';
import { rootReducer, IRootState } from '@/store/rootReducer';

const store = configureStore({
    reducer: rootReducer,
});

const { dispatch } = store;

const useSelector: TypedUseSelectorHook<IRootState> = useAppSelector;
//const useSelector: TypedUseSelectorHook<any> = useAppSelector;

const useDispatch = () => useAppDispatch();

export type AppDispatch = typeof store.dispatch;

export { store, dispatch, useSelector, useDispatch };
