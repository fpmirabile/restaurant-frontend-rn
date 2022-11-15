import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { geolocationAPI } from '../../../api/geocoding.api';
import { Days, Restaurant, RestaurantAPI } from '../../../api/restaurant.api';
// import ImgToBase64 from 'react-native-image-base64-png';

type State = {
  restaurants: Restaurant[];
  home: {
    loading: boolean;
    error: string;
  };
  view: {
    loading: boolean;
    error: string;
    selectedRestaurant?: Restaurant;
  };
  create: {
    loading: boolean;
    error: string;
    stepOne: StepOneFields;
    stepTwo: StepTwoFields;
  };
  menu: CreateMenu;
};

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
  categoryId: string;
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
  view: {
    loading: false,
    error: '',
    selectedRestaurant: undefined,
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
    categoryId: '',
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
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState() as any;
      const restaurants = state.restaurant as State;
      // const images = restaurants.create.stepTwo.images as string[];
      // const base64Images = await Promise.all(
      //   images.map(async value => {
      //     const base64 = await ImgToBase64.getBase64String(value);
      //     return base64;
      //   }),
      // );

      const newRestaurant = {
        foodType: restaurants.create.stepTwo.typeOfFood,
        priceRange: restaurants.create.stepTwo.priceRange,
        street: restaurants.create.stepOne.street,
        streetNumber: restaurants.create.stepOne.streetNumber,
        place: restaurants.create.stepOne.neighborhood,
        neighborhood: restaurants.create.stepOne.neighborhood,
        locality: restaurants.create.stepOne.locality,
        state: restaurants.create.stepOne.state,
        name: restaurants.create.stepOne.name,
        lat: Number(restaurants.create.stepOne.lat) || 0,
        lon: Number(restaurants.create.stepOne.lon) || 0,
        images: [],
        openDays: restaurants.create.stepTwo.times.map((time: any) => {
          return {
            day: time.day,
            openTime: time.times[0]?.from || '',
            closeTime: time.times[0]?.to || '',
            open: time.open,
          };
        }),
      };

      console.log(newRestaurant);
      const response = await RestaurantAPI.createRestaurant(newRestaurant);
      console.log('restaurant created: ', response);
      dispatch(getRestaurants());
      return response;
    } catch (err) {
      console.log(err);
      rejectWithValue(err);
    }
  },
);

const getLatAndLon = async (
  address: any,
  rejectWithValue: any,
): Promise<{ latitude: string; longitude: string } | undefined> => {
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
      const rState = getState() as any;
      const restaurants = rState.restaurant as State;
      const menu = restaurants.menu;
      const request = {
        name: menu.name,
        images: [],
        ingredients: menu.ingredients,
        suitableCeliac: menu.vegan,
        suitableVegan: menu.celiac,
        price: Number(menu.price),
      };
      const response = await RestaurantAPI.createMenu(menu.categoryId, request);

      console.log(
        'categoryId',
        menu.category,
        menu.categoryId,
        'request',
        request,
        'response: ',
        response,
      );

      return response;
    } catch (error) {
      console.log('create menu error', error);
      rejectWithValue(error);
    }
  },
);

const selectRestaurant = createAsyncThunk(
  'restaurants/selectRestaurant',
  async (payload: number, { rejectWithValue }) => {
    try {
      const restaurant = await RestaurantAPI.getSingleRestaurant(payload);
      console.log('response selectRestaurant: ', restaurant);
      return restaurant;
    } catch (error) {
      console.log('selected restaurant rejected', error);
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
    builder.addCase(selectRestaurant.pending, state => {
      state.view.loading = true;
    });
    builder.addCase(selectRestaurant.fulfilled, (state, action) => {
      state.view.loading = false;
      state.view.selectedRestaurant = action.payload;
    });
    builder.addCase(selectRestaurant.rejected, (state, action) => {
      state.view.loading = false;
      const message = (action as any).message;
      if (message) {
        state.view.error = message;
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
    handleStepOneSave,
    saveMenu,
    selectRestaurant,
  },
  reducer,
};
