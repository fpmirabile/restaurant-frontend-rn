import React from 'react';
import { Provider } from 'react-redux';
import { View, Text } from 'react-native';

import { Navigation } from './navigation/navigation';
import { store } from './redux';

export function Home() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

export function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
