import * as React from 'react';
import { Home } from '../App';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  // type NativeStackScreenProps,
} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
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
        <Stack.Screen name="Home" component={Home} />
        {/* <RootStack.Screen
          name="Profile"
          component={Profile}
          initialParams={{ userId: user.id }}
        />
        <RootStack.Screen name="Feed" component={Feed} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
