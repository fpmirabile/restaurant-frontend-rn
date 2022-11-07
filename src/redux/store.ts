import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { restaurantSlice } from './reducers/restaurant/slice';
import { userSlice, UserState } from './reducers/user/slice';

const persistConfiguration = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};

export const realStore = configureStore({
  reducer: {
    user: persistReducer<UserState, any>(
      persistConfiguration,
      userSlice.reducer,
    ),
    restaurant: restaurantSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export const persistedStore = persistStore(realStore);

type RootState = ReturnType<typeof realStore.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof realStore.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
