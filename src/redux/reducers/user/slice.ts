import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getSession,
  removeSession,
  setSession,
} from '../../../api/config/session';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
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
    try {
      const { token, refreshToken } = await UserAPI.loginCredentials({
        username: username.trim(),
        password,
      });

      await setSession({
        jwt: token,
        refreshToken,
      });

      const userData = await UserAPI.me();

      return {
        ...userData,
        token,
        refreshToken,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const googleSignIn = createAsyncThunk(
  'user/googleSignIn',
  async (_, { rejectWithValue }) => {
    try {
      const hasPlayServices = await GoogleSignin.hasPlayServices();
      console.log(hasPlayServices);
      if (!hasPlayServices) {
        throw { error: statusCodes.PLAY_SERVICES_NOT_AVAILABLE };
      }

      const {
        idToken,
        user: { email },
      } = await GoogleSignin.signIn();
      console.log(idToken, email);
      if (idToken) {
        const { token, refreshToken } = await UserAPI.loginSso({
          idToken,
          email,
        });
        console.log(token, refreshToken);

        const saved = await setSession({
          jwt: token,
          refreshToken,
        });

        console.log('saved', saved);
        const userData = await UserAPI.me();
        console.log(userData);
        return { ...userData, token, refreshToken };
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);

const deleteUser = createAsyncThunk(
  'user/delete',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Eliminando');
      await UserAPI.deleteUser();
    } catch (error) {
      console.log('Error al eliminar la cuenta');
      return rejectWithValue(error);
    }
  },
);

const changePassword = createAsyncThunk(
  'user/changePassword',
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      await UserAPI.changePassword(payload.email, payload.password);
    } catch (error) {
      console.log('Error al cambiar la contraseña');
      return rejectWithValue(error);
    }
  },
);

export type UserState = {
  isAppInitLoading: boolean;
  auth: {
    jwt: string;
    refresh: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  };
  registration: {
    loading: boolean;
    error: string;
  };
  login: {
    loading: boolean;
    ssoError: string;
    credentialsError: string;
  };
  forgotPassword: {
    loading: boolean;
    error: string;
  };
};

const initialState: UserState = {
  isAppInitLoading: true,
  auth: {
    jwt: '',
    refresh: '',
  },
  user: {
    id: '',
    name: '',
    email: '',
    isAdmin: false,
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
  forgotPassword: {
    error: '',
    loading: false,
  },
};

const userAppSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: state => {
      removeSession();
      console.log('log out ejecutado.');
      state.auth = {
        ...initialState.auth,
      };

      state.user = {
        ...initialState.user,
      };
    },
  },
  extraReducers(builder) {
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
      const { email, id, name, refreshToken, token } = action.payload;
      state.login.loading = false;
      state.auth.refresh = refreshToken;
      state.auth.jwt = token;
      state.user = {
        id,
        email,
        name,
        isAdmin: true,
      };
    });
    builder.addCase(loginWithCredentials.rejected, (state, action) => {
      state.login.loading = false;
      state.login.credentialsError =
        (action.payload as ErrorType).message || 'Ocurrio un error insperado';
    });
    builder.addCase(googleSignIn.pending, state => {
      state.login.loading = true;
    });
    builder.addCase(googleSignIn.fulfilled, (state, action) => {
      const payload = action.payload;
      console.log(payload);
      state.auth = {
        jwt: payload?.token,
        refresh: payload?.refreshToken,
      };
      state.user = {
        email: payload?.email || '',
        name: payload?.name || '',
        id: payload?.id || '',
        isAdmin: false,
      };
      state.login = {
        ...initialState.login,
      };
    });
    builder.addCase(googleSignIn.rejected, (state, action) => {
      const error = action.payload as { code: string };
      state.login.loading = false;
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        state.login.ssoError =
          'La autentificacion de Google ha sido cancelada.';
      } else if (error.code === statusCodes.IN_PROGRESS) {
        state.login.ssoError =
          'La autentificacion de Google se encuentra en progreso.';
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        state.login.ssoError = 'Usted no tiene de Google Play Services.';
      } else {
        state.login.ssoError =
          'Un error desconocido ha ocurrido con la autentificacion de Google';
        console.log(error);
      }
    });
    builder.addCase(deleteUser.fulfilled, state => {
      removeSession();
      console.log('Cuenta eliminada');
      state.auth = {
        ...initialState.auth,
      };

      state.user = {
        ...initialState.user,
      };
    });
    builder.addCase(changePassword.pending, state => {
      state.forgotPassword.loading = true;
    });
    builder.addCase(changePassword.fulfilled, state => {
      state.forgotPassword.loading = false;
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.forgotPassword.loading = false;
      const errorObject = action.payload as any;
      if (action.payload && errorObject.message) {
        state.forgotPassword.error = errorObject.message;
      }
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
    googleSignIn,
    deleteUser,
    changePassword,
  },
  reducer,
};
