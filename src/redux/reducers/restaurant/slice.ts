import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { geolocationAPI } from '../../../api/geocoding.api';
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
  menu: CreateMenu;
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

export type CreateMenu = {
  category: string;
  name: string;
  price: string;
  vegan: boolean;
  celiac: boolean;
  images: string[];
  ingredients: string[];
  loading: boolean;
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
  menu: {
    category: '',
    celiac: false,
    images: [],
    ingredients: [],
    name: '',
    price: '',
    vegan: false,
    loading: false,
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

const getLatAndLon = async (address: any, rejectWithValue: any) => {
  try {
    const { locality, neighborhood, state, street, streetNumber } = address;
    const arrayAddress = [
      street,
      streetNumber,
      neighborhood,
      locality,
      state,
      'Argentina',
    ];

    const geoLocation = await geolocationAPI.getLatAndLon(
      arrayAddress.filter(i => !!i).join(' '),
    );

    if (geoLocation.status === 'OK') {
      const preferredResult =
        geoLocation.results[0]?.geometry.location || undefined;
      if (preferredResult) {
        return {
          latitude: preferredResult.lat,
          longitude: preferredResult.lng,
        };
      }
    }
  } catch (error) {
    console.log(error);
    rejectWithValue(error);
  }
};

const handleStepOneSave = createAsyncThunk(
  'restaurant/getLatitudeAndLongitude',
  async (
    payload: State['create']['stepOne'],
    { rejectWithValue, dispatch },
  ) => {
    await dispatch(sliceActions.onUpdateStepOne(payload));
    const getLocation = await getLatAndLon(payload, rejectWithValue);
    return getLocation;
  },
);

const saveMenu = createAsyncThunk(
  'restaurants/saveMenu',
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        menu: { category, ...menu },
      } = getState() as State;
      const response = await RestaurantAPI.createMenu(category, {
        ...menu,
        suitableCeliac: menu.vegan,
        suitableVegan: menu.celiac,
        price: Number(menu.price),
      });

      return response;
    } catch (error) {
      console.log('create menu error', error);
      rejectWithValue(error);
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
    updateMenu: (state, action: PayloadAction<CreateMenu>) => {
      state.menu = {
        ...state.menu,
        ...action.payload,
      };
    },
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
    builder.addCase(handleStepOneSave.fulfilled, (state, action) => {
      state.create.stepOne = {
        ...state.create.stepOne,
        lat: action.payload?.latitude.toString() || '',
        lon: action.payload?.longitude.toString() || '',
      };
    });
    builder.addCase(saveMenu.pending, state => {
      state.menu.loading = true;
    });
    builder.addCase(saveMenu.fulfilled, state => {
      state.menu = {
        ...initialState.menu,
      };
    });
    builder.addCase(saveMenu.rejected, state => {
      state.menu.loading = false;
      console.log('create menu rejected');
      // if (action.payload) {
      //   state.create.error =
      //     (action.payload as any).message || 'Ocurrio un error insperado';
      // }
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
    handleStepOneSave,
    saveMenu,
  },
  reducer,
};
