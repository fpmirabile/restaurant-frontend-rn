import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Restaurant, RestaurantAPI } from '../../../api/restaurant.api';

type State = {
  restaurants: Restaurant[];
  home: {
    loading: boolean;
    error: string;
  };
};

const initialState: State = {
  restaurants: [],
  home: {
    loading: false,
    error: '',
  },
};

const getRestaurants = createAsyncThunk(
  'restaurant/getRestaurants',
  async (_, { rejectWithValue }) => {
    try {
      console.log('get restaurants');
      const restaurants = await RestaurantAPI.getRestaurants();
      console.log(restaurants);
      return restaurants;
    } catch (error) {
      console.log('error', error);
      return rejectWithValue(error);
    }
  },
);

const restaurantAppSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    test: () => {},
  },
  extraReducers(builder) {
    builder.addCase(getRestaurants.rejected, (state, action) => {
      console.log('get restaurants rejected', action);
      state.home.loading = false;
      if (action.payload) {
        state.home.error =
          (action.payload as any).message || 'Ocurrio un error insperado';
      }
    });
    builder.addCase(getRestaurants.pending, state => {
      state.home.loading = true;
      console.log('get restaurants pending');
      state.home.error = '';
    });
    builder.addCase(getRestaurants.fulfilled, (state, action) => {
      console.log('get restaurants fullfilled');
      state.home.loading = false;
      state.restaurants = action.payload || [];
    });
  },
});

const sliceActions = restaurantAppSlice.actions;
const reducer = restaurantAppSlice.reducer;
export const restaurantSlice = {
  actions: {
    ...sliceActions,
    getRestaurants,
  },
  reducer,
};
