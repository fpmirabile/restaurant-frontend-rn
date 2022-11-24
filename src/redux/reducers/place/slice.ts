import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PlaceAPI } from '../../../api/place.api';

const getLocalities = createAsyncThunk(
  'place/localities',
  async (selectedProvinceName: string, { rejectWithValue, getState }) => {
    try {
      const globalAppState = getState() as any;
      const { states, lastStateId } = globalAppState.place as PlaceState;
      console.log('getting localities', 'selected: ', selectedProvinceName);
      const provinceId = states.find(
        province =>
          province.value.toLowerCase() === selectedProvinceName.toLowerCase(),
      )?.key;

      if (provinceId && provinceId !== lastStateId) {
        console.log('provinceId', provinceId);
        const localities = await PlaceAPI.getLocalities(Number(provinceId));
        return { provinceId, localities };
      }

      return undefined;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

const getProvinces = createAsyncThunk(
  'place/provinces',
  async (_, { rejectWithValue }) => {
    try {
      console.log('getting provinces');
      const provinces = PlaceAPI.getStates();
      return provinces;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

type DropdownType = {
  key: string;
  value: string;
};

type PlaceState = {
  lastStateId?: string;
  loading: boolean;
  localities: DropdownType[];
  states: DropdownType[];
};

const initialState: PlaceState = {
  lastStateId: undefined,
  loading: false,
  localities: [],
  states: [],
};

const placeAppSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getLocalities.pending, state => {
      state.loading = true;
    });
    builder.addCase(getProvinces.pending, state => {
      state.loading = true;
    });
    builder.addCase(getLocalities.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        const { provinceId, localities } = action.payload;
        state.localities = localities.map(locality => {
          return {
            key: locality.id.toString(),
            value: locality.localidad,
          };
        });
        state.lastStateId = provinceId;
      }
    });
    builder.addCase(getLocalities.rejected, () => {});
    builder.addCase(getProvinces.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.states = action.payload.map(province => {
          return { key: province.id.toString(), value: province.provincia };
        });
      }
    });
    builder.addCase(getProvinces.rejected, () => {});
  },
});

const sliceActions = placeAppSlice.actions;
const reducer = placeAppSlice.reducer;
export const placeSlice = {
  actions: {
    ...sliceActions,
    getLocalities,
    getProvinces,
  },
  reducer,
};
