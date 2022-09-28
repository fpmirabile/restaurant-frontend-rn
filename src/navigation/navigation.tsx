import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Login, Home, UserRegistration } from '../components/pages/';
import { HomeNavHeader } from '../components/headers';

export interface MorfandoRouterParams<A extends keyof RootStackParamList>
  extends NativeStackScreenProps<RootStackParamList, A> {}

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Registration: undefined;
  // Profile: { userId: string };
  // Feed: { sort: 'latest' | 'top' } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={UserRegistration} />
        <Stack.Screen
          options={{
            header: () => {
              return <HomeNavHeader />;
            },
            headerShown: true,
          }}
          component={Home}
          name="Home"
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
