import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { geolocationAPI } from '../../../api/geocoding.api';
import {
  Days,
  Restaurant,
  RestaurantAPI,
  Category,
  FullRestaurant,
} from '../../../api/restaurant.api';
import { tryRequestGeoPermissions } from '../../../util/geolocalization';
import Geolocation from '@react-native-community/geolocation';
import { RootState } from '../../store';
import { placeSlice } from '../place/slice';
import { localImageToBase64 } from '../../../util/images';

type State = {
  restaurants: Restaurant[];
  listRestaurants: Restaurant[];
  favorites: Restaurant[];
  filterText: string;
  home: {
    loading: boolean;
    error: string;
  };
  view: {
    loading: boolean;
    error: string;
    selectedRestaurant?: FullRestaurant;
  };
  create: {
    loading: boolean;
    error: string;
    id?: number;
    stepOne: StepOneFields;
    stepTwo: StepTwoFields;
  };
  myFav: {
    loading: boolean;
    error: string;
  };
  menu: CreateMenu;
  categories: Category[];
};

export type StepTwoFields = {
  typeOfFood: string;
  priceRange: string;
  times: {
    day: Days;
    open: boolean;
    closeTime: string;
    openTime: string;
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
  error?: string;
};

const initialState: State = {
  restaurants: [],
  favorites: [],
  listRestaurants: [],
  filterText: '',
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
    id: undefined,
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
    error: undefined,
  },
  categories: [],
  myFav: {
    loading: false,
    error: '',
  },
};

const getCurrentPosition = createAsyncThunk('currentPosition', async () => {
  return new Promise<{ latitude: number; longitude: number }>(
    (resolve, reject) => {
      Geolocation.setRNConfiguration({
        authorizationLevel: 'auto',
        locationProvider: 'android',
        skipPermissionRequests: false,
      });
      Geolocation.requestAuthorization();
      Geolocation.getCurrentPosition(
        values => {
          console.log('values', values);
          resolve({
            latitude: values.coords.latitude,
            longitude: values.coords.longitude,
          });
        },
        error => {
          console.log('current position error', error);
          reject({
            latitude: 0,
            longitude: 0,
          });
        },
        {
          enableHighAccuracy: false,
          maximumAge: 1,
          timeout: 10000,
        },
      );
    },
  );
});

const getNearRestaurants = createAsyncThunk(
  'restaurant/getNearRestaurants',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const localization = await tryRequestGeoPermissions({
        permission: 'android.permission.ACCESS_FINE_LOCATION',
      });

      if (localization) {
        const loc = await dispatch(getCurrentPosition());
        console.log('localization', localization);
        const { latitude, longitude } = loc.payload as {
          latitude: number;
          longitude: number;
        };

        const restaurants = await RestaurantAPI.getRestaurantsNearMe(
          latitude,
          longitude,
        );
        console.log('near me restaurants');
        return restaurants;
      }

      return [];
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

const putFavorite = createAsyncThunk(
  'restaurant/favorite',
  async (payload: number, { rejectWithValue }) => {
    try {
      await RestaurantAPI.putFavorite(payload);
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

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

const getCategoriesByRestaurant = createAsyncThunk(
  'restaurant/getCategories',
  async (payload: number | undefined, { getState, rejectWithValue }) => {
    try {
      const rState = getState() as any;
      const restaurants = rState.restaurant as State;
      const selectedRestaurant = restaurants.view.selectedRestaurant;
      console.log('get categories');
      if (!payload && !selectedRestaurant) {
        return;
      }

      const categories = await RestaurantAPI.getRestaurantCategories(
        selectedRestaurant?.id || payload || 0,
      );
      return categories;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const createCategory = createAsyncThunk(
  'restaurant/createCategory',
  async (
    {
      categoryName,
      restaurantId,
    }: { categoryName: string; restaurantId: number },
    { rejectWithValue, dispatch },
  ) => {
    try {
      if (!categoryName || !restaurantId) {
        return;
      }

      console.log('creating new category', restaurantId);
      await RestaurantAPI.createNewCategory(restaurantId, categoryName);
      setTimeout(() => {
        dispatch(getCategoriesByRestaurant(restaurantId));
      }, 1000);
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

const getFavorites = createAsyncThunk(
  'restaurant/getFavorites',
  async (_, { rejectWithValue }) => {
    try {
      console.log('get favorites');
      const favorites = await RestaurantAPI.getFavorites();
      return favorites;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const saveEditRestaurant = createAsyncThunk(
  'restaurant/saveEditRestaurant',
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const appGlobalState = getState() as RootState;
      const restaurants = appGlobalState.restaurant as State;
      const id = restaurants.create.id;
      if (!id) {
        return;
      }

      const images = restaurants.create.stepTwo.images;
      const base64Images = await localImageToBase64(images);
      const editRestaurantPayload = {
        foodType: restaurants.create.stepTwo.typeOfFood,
        priceRange: restaurants.create.stepTwo.priceRange,
        street: restaurants.create.stepOne.street,
        streetNumber: restaurants.create.stepOne.streetNumber,
        place: restaurants.create.stepOne.locality,
        neighborhood: restaurants.create.stepOne.neighborhood,
        state: restaurants.create.stepOne.state,
        name: restaurants.create.stepOne.name,
        lat: Number(restaurants.create.stepOne.lat) || 0,
        lon: Number(restaurants.create.stepOne.lon) || 0,
        images: base64Images,
        openDays: restaurants.create.stepTwo.times.map(time => {
          return {
            day: time.day,
            openTime: time.openTime || '',
            closeTime: time.closeTime || '',
            open: time.open,
          };
        }),
      };

      await RestaurantAPI.editRestaurant(id, editRestaurantPayload);
      console.log('edit restaurant triggered');
      setTimeout(() => {
        dispatch(getRestaurants());
      }, 2000);
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

const createRestaurant = createAsyncThunk(
  'restaurant/createRestaurant',
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState() as any;
      const restaurants = state.restaurant as State;
      const images = restaurants.create.stepTwo.images;
      const base64Images = await localImageToBase64(images);

      const newRestaurant = {
        foodType: restaurants.create.stepTwo.typeOfFood,
        priceRange: restaurants.create.stepTwo.priceRange,
        street: restaurants.create.stepOne.street,
        streetNumber: restaurants.create.stepOne.streetNumber,
        place: restaurants.create.stepOne.locality,
        neighborhood: restaurants.create.stepOne.neighborhood,
        state: restaurants.create.stepOne.state,
        name: restaurants.create.stepOne.name,
        lat: Number(restaurants.create.stepOne.lat) || 0,
        lon: Number(restaurants.create.stepOne.lon) || 0,
        images: base64Images,
        openDays: restaurants.create.stepTwo.times.map(time => {
          return {
            day: time.day,
            openTime: time.openTime || '',
            closeTime: time.closeTime || '',
            open: time.open,
          };
        }),
      };

      const response = await RestaurantAPI.createRestaurant(newRestaurant);
      console.log('restaurant created');
      setTimeout(() => {
        dispatch(getRestaurants());
      }, 2000);
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
    { rejectWithValue, dispatch, getState },
  ) => {
    const appGlobalState = getState() as RootState;
    const {
      create: {
        stepOne: { state: province },
      },
    } = appGlobalState.restaurant;
    if (province !== payload.state) {
      dispatch(placeSlice.actions.getLocalities(payload.state));
    }

    await dispatch(sliceActions.onUpdateStepOne(payload));
    const getLocation = await getLatAndLon(payload, rejectWithValue);
    return getLocation;
  },
);

const saveMenu = createAsyncThunk(
  'restaurants/saveMenu',
  async (
    restaurantId: number | undefined,
    { getState, rejectWithValue, dispatch },
  ) => {
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
      if (restaurantId) {
        dispatch(selectRestaurant(restaurantId));
      }
      return response;
    } catch (error) {
      console.log('create menu error', error);
      rejectWithValue(error);
    }
  },
);

const selectRestaurant = createAsyncThunk(
  'restaurants/selectRestaurant',
  async (payload: number, { rejectWithValue, dispatch }) => {
    try {
      const restaurant = await RestaurantAPI.getSingleRestaurant(payload);
      const state = restaurant.address.split(',')[3]?.trim() || '';
      console.log('response selectRestaurant');
      dispatch(placeSlice.actions.getLocalities(state));
      dispatch(getCategoriesByRestaurant(restaurant.id));
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
    editRestaurant: (state, action: PayloadAction<FullRestaurant>) => {
      const {
        lat,
        lon,
        address,
        foodType,
        name,
        photos,
        priceRange,
        openDays,
        id,
      } = action.payload;
      const splitAddress = address.split(',');
      state.create.id = id;
      state.create.error = '';
      state.create.loading = false;
      state.create.stepOne = {
        lat,
        lon,
        name,
        street: splitAddress[0]?.replace(/[0-9]/g, '') || '',
        streetNumber: splitAddress[0]?.replace(/\D/g, '') || '',
        locality: splitAddress[2]?.trim() || '',
        neighborhood: splitAddress[1]?.trim() || '',
        state: splitAddress[3]?.trim() || '',
      };
      state.create.stepTwo = {
        images: photos,
        priceRange,
        times: openDays || [],
        typeOfFood: foodType,
      };
    },
    filter: (state, action: PayloadAction<string>) => {
      const filterText = action.payload;
      state.filterText = filterText;
      if (!filterText) {
        state.listRestaurants = [...state.restaurants];
        return;
      }

      state.listRestaurants = state.listRestaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(filterText.toLowerCase()),
      );
    },
    cleanViewScreen: state => {
      state.categories = [];
      state.view = {
        ...initialState.view,
      };
    },
    clean: state => {
      state.restaurants = [];
      state.listRestaurants = [];
      state.filterText = '';
      state.view = {
        ...initialState.view,
      };
    },
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
    restaurantCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getRestaurants.rejected, (state, action) => {
      console.log('get restaurants rejected', action);
      state.home.loading = false;
      state.filterText = '';
      if (action.payload) {
        state.home.error =
          (action.payload as any).message || 'Ocurrio un error insperado';
      }
    });
    builder.addCase(getRestaurants.pending, state => {
      state.home.loading = true;
      console.log('get restaurants pending');
      state.home.error = '';
      state.restaurants = [];
      state.listRestaurants = [];
      state.filterText = '';
    });
    builder.addCase(getRestaurants.fulfilled, (state, action) => {
      state.home.loading = false;
      state.restaurants = [...action.payload] || [];
      state.listRestaurants = [...action.payload] || [];
      console.log('get restaurants fullfilled');
    });

    builder.addCase(getFavorites.rejected, (state, action) => {
      console.log('get restaurants rejected', action);
      state.myFav.loading = false;
      // state.filterText = '';
      if (action.payload) {
        state.myFav.error =
          (action.payload as any).message || 'Ocurrio un error insperado';
      }
    });
    builder.addCase(getFavorites.pending, state => {
      state.myFav.loading = true;
      console.log('get restaurants pending');
      state.myFav.error = '';
    });
    builder.addCase(getFavorites.fulfilled, (state, action) => {
      console.log('get restaurants fullfilled');
      state.myFav.loading = false;
      state.favorites = action.payload || [];
      // state.listRestaurants = [...action.payload] || [];
      // state.filterText = '';
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
    builder.addCase(saveEditRestaurant.pending, state => {
      state.create.loading = true;
      console.log('edit pending');
    });
    builder.addCase(saveEditRestaurant.fulfilled, state => {
      state.create = {
        ...initialState.create,
      };
      console.log('edit restaurant fullfilled');
    });
    builder.addCase(saveEditRestaurant.rejected, (state, action) => {
      state.create.loading = false;
      console.log('edit rejected');
      if (action.payload) {
        state.create.error =
          (action.payload as any).message || 'Ocurrio un error insperado';
      }
    });

    //Extra reducres categorias
    builder.addCase(getCategoriesByRestaurant.rejected, (_, action) => {
      console.log('get categories rejected', action);
    });
    builder.addCase(getCategoriesByRestaurant.pending, () => {
      // state.home.loading = true;
      console.log('get categorias pending');
    });
    builder.addCase(getCategoriesByRestaurant.fulfilled, (state, action) => {
      console.log('get categories fullfilled', action.payload);
      state.categories = action.payload || [];
      // state.categories = action.payload || [];
      // state.categories.id = action.payload.id;
      // state.categories.name = action.payload.name
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
      state.view.error = '';
      state.view.selectedRestaurant = action.payload;
    });
    builder.addCase(selectRestaurant.rejected, (state, action) => {
      state.view.loading = false;
      const message = (action as any).message;
      if (message) {
        state.view.error = message;
      }
    });
    builder.addCase(getNearRestaurants.pending, state => {
      state.home.loading = true;
    });
    builder.addCase(getNearRestaurants.fulfilled, (state, action) => {
      state.home.loading = false;
      state.home.error = '';
      state.restaurants = action.payload || [];
      state.listRestaurants = [...(action.payload || [])];
      state.filterText = '';
    });
    builder.addCase(getNearRestaurants.rejected, (state, action) => {
      state.home.loading = false;
      state.filterText = '';
      const message = (action.payload as any).message;
      if (message) {
        state.home.error = message;
      }
    });
    builder.addCase(putFavorite.rejected, (state, action) => {
      state.home.loading = false;
      state.filterText = '';
      const message = (action.payload as any).message;
      if (message) {
        state.home.error = message;
      }
    });
    builder.addCase(putFavorite.fulfilled, state => {
      state.home.loading = false;
      state.home.error = '';
    });
    builder.addCase(createCategory.pending, state => {
      state.menu.loading = true;
      state.menu.error = undefined;
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.menu.loading = false;
      const message = (action.payload as any).message;
      if (message) {
        state.menu.error = message;
      }
    });
    builder.addCase(createCategory.fulfilled, state => {
      state.menu.loading = false;
      state.menu.error = undefined;
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
    getNearRestaurants,
    getCategoriesByRestaurant,
    getFavorites,
    putFavorite,
    saveEditRestaurant,
    createCategory,
  },
  reducer,
};
