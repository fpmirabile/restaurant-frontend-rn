import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { restaurantSlice } from './reducers/restaurant-temp/slice';
import { userSlice } from './reducers/user/slice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    restaurantTemp: restaurantSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
