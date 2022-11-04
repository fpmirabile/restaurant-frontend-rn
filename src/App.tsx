import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Navigation } from './navigation/navigation';
import { realStore, persistedStore } from './redux';

export function App() {
  return (
    <Provider store={realStore}>
      <PersistGate loading={null} persistor={persistedStore}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
}
