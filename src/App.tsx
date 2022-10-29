import React from 'react';
import { Provider } from 'react-redux';

import { Navigation } from './navigation/navigation';
import { store } from './redux';
import { Login, Home, UserRegistration, Profile, NewDish } from './pages';

export function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
