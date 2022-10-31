import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getSession,
  removeSession,
  setSession,
} from '../../../api/config/session';
import { RegistrationForm } from '../../../pages/user-registration';
import { UserAPI } from '../../../api/user.api';

type ErrorType = {
  message: string;
};

const initialLoading = createAsyncThunk(
  'user/loadApp',
  async (): Promise<false | [string, string]> => {
    const credentials = await getSession();
    if (!credentials) {
      return false;
    }

    return [credentials.jwt, credentials.refreshToken];
  },
);

const registerOwner = createAsyncThunk(
  'user/registerOwner',
  async (form: RegistrationForm, { dispatch, rejectWithValue }) => {
    try {
      await UserAPI.registerNewOwner({
        email: form.email.value,
        name: form.name.value,
        password: form.password.value,
        repeatPassword: form.repeatPassword.value,
      });

      dispatch(
        userSlice.actions.loginWithCredentials({
          username: form.email.value,
          password: form.password.value,
        }),
      );
    } catch (err) {
      return rejectWithValue(err as ErrorType);
    }
  },
);

type LoginPayload = {
  username: string;
  password: string;
};
const loginWithCredentials = createAsyncThunk(
  'user/loginCredentials',
  async ({ username, password }: LoginPayload, { rejectWithValue }) => {
    console.log('login');
    try {
      const loginTokens = await UserAPI.loginCredentials({
        username: username.trim(),
        password,
      });
      return [loginTokens.token, loginTokens.refreshToken];
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const initialState = {
  isAppInitLoading: true,
  auth: {
    jwt: '',
    refresh: '',
  },
  registration: {
    loading: false,
    error: '',
  },
  login: {
    loading: false,
    ssoError: '',
    credentialsError: '',
  },
};

const userAppSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: state => {
      removeSession();
      state.auth = {
        ...initialState.auth,
      };
    },
  },
  extraReducers(builder) {
    // No need of rejected due to session.ts handling of the session.
    builder.addCase(initialLoading.fulfilled, (state, action) => {
      state.isAppInitLoading = false;
      if (!action.payload) {
        return;
      }

      const [jwt, refreshToken] = action.payload;
      state.auth.jwt = jwt;
      state.auth.refresh = refreshToken;
    });
    builder.addCase(registerOwner.pending, state => {
      state.registration.loading = true;
      state.registration.error = '';
    });
    builder.addCase(registerOwner.fulfilled, (state, action) => {
      if (action.payload) {
        state.registration.error = action.payload;
        state.registration.loading = false;
        return;
      }

      state.registration.loading = false;
    });
    builder.addCase(registerOwner.rejected, (state, action) => {
      state.registration.loading = false;
      state.registration.error =
        (action.payload as ErrorType).message || 'Ocurrio un error insperado';
    });
    builder.addCase(loginWithCredentials.pending, state => {
      state.login.loading = true;
      state.login.credentialsError = '';
    });
    builder.addCase(loginWithCredentials.fulfilled, (state, action) => {
      const [jwt, refresh] = action.payload;
      state.auth.jwt = jwt;
      state.auth.refresh = refresh;
      setSession({ jwt, refreshToken: refresh });
    });
    builder.addCase(loginWithCredentials.rejected, (state, action) => {
      state.login.loading = false;
      state.login.credentialsError =
        (action.payload as ErrorType).message || 'Ocurrio un error insperado';
    });
  },
});

const sliceActions = userAppSlice.actions;
const reducer = userAppSlice.reducer;
export const userSlice = {
  actions: {
    ...sliceActions,
    initialLoading,
    registerOwner,
    loginWithCredentials,
  },
  reducer,
};
