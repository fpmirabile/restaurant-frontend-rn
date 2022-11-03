import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RegistrationForm } from '../../../pages/user-registration';
import { UserAPI } from '../../../api/user.api';

type ErrorType = {
  message: string;
};


const registerOwner = createAsyncThunk(
  'user/registerOwner',// El nombre siempre empieza con el nombre del slice/ un nombre . El mio seria restaurant/(loquehace)
    // call back  es algo que eventualmente va a pasar en el futuruo. puede ser async o no.
  async (form: RegistrationForm, { dispatch, rejectWithValue }) => {
    try {
      await UserAPI.registerNewOwner({
        email: form.email.value,
        name: form.name.value,
        password: form.password.value,
        repeatPassword: form.repeatPassword.value,
      });

      dispatch(
        restaurantSlice.actions.loginWithCredentials({
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
  'user/loginCredentials',// El nombre siempre empieza con el nombre del slice/ un nombre . El mio seria restaurant/(loquehace)
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
//El estado tiene cosas en comun y cosas de cada pantalla
  newCategoryAndItem:{}// Todo lo de mi pantalla va a aca. Datos que tenga que guardar, todo lo que guarde aca es global. Es como mi estado, esto se persiste
};

const restaurantAppSlice = createSlice({
  name: 'restaurant',//este es el nombre del slice
  initialState,
  reducers: {
    //cada reducer como parametro recibe un state y un action. Action tiene un monton de cosas pero lo que me importan es el payload es lo que mando entre () el payload, como los argumentos.
    // todo lo que tengo aca son sincronicos que va a hacer la app. Cambios sincronicos son cosas que hago en el celu y el dispositivo no tienen que esperar a ninguna respuesta del back
    // tampoco puedo despachar acciones
    // tampoco puedo hacer despacho de mas de un reducer a la vez.
    logOut: state => {
      state.auth = {
        ...initialState.auth, // Es lo mismo que auth = new. Deja el estado como al principio limpito
      };
    },
  },
  extraReducers(builder) {
    // No need of rejected due to session.ts handling of the session.
    // Los extraReducer son todos asincronicos. Son promisses que tienen 3 estados pending, fulfilled, rejected
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
    });
    builder.addCase(loginWithCredentials.rejected, (state, action) => {
      state.login.loading = false;
      state.login.credentialsError =
        (action.payload as ErrorType).message || 'Ocurrio un error insperado';
    });
  },
});

const sliceActions = restaurantAppSlice.actions;
const reducer = restaurantAppSlice.reducer;
export const restaurantSlice = {
  actions: {
    ...sliceActions,
    registerOwner,
    loginWithCredentials,
  },
  reducer,
};
