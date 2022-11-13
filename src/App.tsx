import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Navigation } from './navigation/navigation';
import { realStore, persistedStore } from './redux';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  webClientId:
    '188636490115-q156nkkh8eu45b6ahqpue80pqqcmr5q3.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
});

export function App() {
  return (
    <Provider store={realStore}>
      <PersistGate loading={null} persistor={persistedStore}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
}
