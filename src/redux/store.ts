import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { restaurantSlice } from './reducers/restaurant/slice';
import { userSlice } from './reducers/user/slice';

const persistConfiguration = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};

export const realStore = configureStore({
  reducer: {
    user: persistReducer(persistConfiguration, userSlice.reducer),
    restaurant: restaurantSlice.reducer,
  },
});

export const persistedStore = persistStore(realStore);

type RootState = ReturnType<typeof realStore.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof realStore.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
