import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsernameAndPassword, setSession } from '../../../api/session';

const initialLoading = createAsyncThunk(
  'general/loadApp',
  async (): Promise<false | [string, string]> => {
    const credentials = await getUsernameAndPassword();
    if (!credentials) {
      return false;
    }

    return [credentials.username, credentials.password];
  },
);

// const sleep = <T>(ms: number, returnValue: T): Promise<T> => {
//   return new Promise((resolve) => setTimeout(() => resolve(returnValue), ms));
// };

const generalAppSlice = createSlice({
  name: 'general',
  initialState: {
    isAppInitLoading: true,
    auth: {
      username: '',
      password: '',
      jwt: '',
      refresh: '',
    },
  },
  reducers: {
    login: (
      state,
      action: PayloadAction<{ username: string; password: string }>,
    ) => {
      const { username, password } = action.payload;
      setSession({ username, password });
      state.auth.username = action.payload.username;
      state.auth.password = action.payload.password;
    },
  },
  extraReducers(builder) {
    // No need of rejected due to session.ts handling of the session.
    builder.addCase(initialLoading.fulfilled, (state, action) => {
      state.isAppInitLoading = false;
      if (!action.payload) {
        return;
      }

      const [username, password] = action.payload;
      state.auth.username = username;
      state.auth.password = password;
    });
  },
});

const sliceActions = generalAppSlice.actions;
const reducer = generalAppSlice.reducer;
export const general = {
  actions: { ...sliceActions, initialLoading },
  reducer,
};