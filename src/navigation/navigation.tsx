import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  // type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Login } from '../components/pages/';
import { UserRegistration } from '../components/pages/login/user-registration'

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
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
