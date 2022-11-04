import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Restaurant, RestaurantAPI } from '../../../api/restaurant.api';

type State = {
  restaurants: Restaurant[];
  home: {
    loading: boolean;
    error: string;
  };
  create: {
    loading: boolean;
    error: string;
    stepOne: StepOneFields;
    stepTwo: StepTwoFields;
  };
};

type Days = 'L' | 'M' | 'X' | 'J' | 'V' | 'S' | 'D';
export type StepTwoFields = {
  typeOfFood: string;
  priceRange: string;
  times: {
    day: Days;
    open: boolean;
    times: { from: string; to: string }[];
  }[];
  images: string[];
};

export type StepOneFields = {
  name: string;
  street: string;
  streetNumber: string;
  neighborhood: string;
  locality: string;
  state: string;
  lat: string;
  lon: string;
};

const initialState: State = {
  restaurants: [],
  home: {
    loading: false,
    error: '',
  },
  create: {
    loading: false,
    error: '',
    stepOne: {
      name: '',
      street: '',
      streetNumber: '',
      neighborhood: '',
      locality: '',
      state: '',
      lat: '',
      lon: '',
    },
    stepTwo: {
      typeOfFood: '',
      priceRange: '',
      times: [],
      images: [],
    },
  },
};

const getRestaurants = createAsyncThunk(
  'restaurant/getRestaurants',
  async (_, { rejectWithValue }) => {
    try {
      console.log('get restaurants');
      const restaurants = await RestaurantAPI.getRestaurants();
      return restaurants;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const createRestaurant = createAsyncThunk(
  'restaurant/createRestaurant',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as State;
      await RestaurantAPI.createRestaurant({
        ...state.create.stepOne,
        ...state.create.stepTwo,
        closeTime: '',
        openDays: [],
        openTime: '',
      });

      return 'OK';
    } catch (err) {
      rejectWithValue(err);
    }
  },
);

const restaurantAppSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    onUpdateStepOne: (
      state,
      action: PayloadAction<State['create']['stepOne']>,
    ) => {
      state.create.stepOne = {
        ...state.create.stepOne,
        ...action.payload,
      };
    },
    onUpdateStepTwo: (
      state,
      action: PayloadAction<State['create']['stepTwo']>,
    ) => {
      state.create.stepTwo = {
        ...state.create.stepTwo,
        ...action.payload,
      };
    },
    onCancelRestaurantCreate: state => {
      state.create = {
        ...initialState.create,
      };
    },
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
    builder.addCase(createRestaurant.pending, state => {
      state.create.loading = true;
      console.log('create pending');
    });
    builder.addCase(createRestaurant.fulfilled, state => {
      state.create = {
        ...initialState.create,
      };
      console.log('create fullfilled');
    });
    builder.addCase(createRestaurant.rejected, (state, action) => {
      state.create.loading = false;
      console.log('create rejected');
      if (action.payload) {
        state.create.error =
          (action.payload as any).message || 'Ocurrio un error insperado';
      }
    });
  },
});

const sliceActions = restaurantAppSlice.actions;
const reducer = restaurantAppSlice.reducer;
export const restaurantSlice = {
  actions: {
    ...sliceActions,
    getRestaurants,
    createRestaurant,
  },
  reducer,
};