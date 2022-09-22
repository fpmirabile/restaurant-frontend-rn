import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  // type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Login, Home, HomeNavHeader } from '../components/pages/';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  // Profile: { userId: string };
  // Feed: { sort: 'latest' | 'top' } | undefined;
};

// This will allow to mock props in each view
// type Props = NativeStackScreenProps<RootStackParamList, 'Profile', 'MyStack'>;
const Stack = createNativeStackNavigator<RootStackParamList>();
export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{
            header: () => {
              return <HomeNavHeader />;
            },
          }}
          component={Home}
          name="Home"
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
