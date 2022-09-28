import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  // type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Login, Home, HomeNavHeader, UserRegistration } from '../components/pages/';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Registration: undefined;
  // Profile: { userId: string };
  // Feed: { sort: 'latest' | 'top' } | undefined;
};

// This will allow to mock props in each view
// export type RouterProps = NativeStackScreenProps<RootStackParamList, 'Registration'>;
const Stack = createNativeStackNavigator<RootStackParamList>();
export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Registration" component={UserRegistration} />
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
