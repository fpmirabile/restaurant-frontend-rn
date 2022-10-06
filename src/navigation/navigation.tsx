import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Login, Home, UserRegistration } from '../components/pages/';
import { HomeNavHeader } from '../components/headers';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { LoadingScreen } from '../components/loading-screen';
import { general } from '../redux';

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
  const dispatcher = useAppDispatch();
  const {
    isAppInitLoading,
    auth: { username },
  } = useAppSelector(state => state.general);
  if (isAppInitLoading) {
    dispatcher(general.actions.initialLoading());
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!username ? ( // !username == significa que no existe el usuario o nunca se logeo. Por ende todo lo que esta a continuacion del "?" es un flow de registro/login
          <Stack.Group>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registration" component={UserRegistration} />
          </Stack.Group>
        ) : (
          <Stack.Group>
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
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
