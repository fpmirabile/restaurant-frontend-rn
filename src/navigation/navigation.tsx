import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  Login,
  Home,
  UserRegistration,
  Profile,
  SuccessRegistration,
  NewDish,
  RestaurantClient,
  ViewFavs,
  FiltersClient,
} from '../pages';
import { HomeNavHeader, ProfileNavHeader } from '../headers';
import { useAppSelector } from '../redux/store';
import { LoadingScreen } from '../components/loading-screen';
import {
  CreateRestaurant,
  RestaurantCreated,
  ViewRestaurant,
} from '../pages/restaurant';
import { COLORS } from '../constants';

export interface MorfandoRouterParams<A extends keyof RootStackParamList>
  extends NativeStackScreenProps<RootStackParamList, A> {}

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Registration: undefined;
  Profile: undefined;
  CreateRestaurant: undefined;
  FinishedRestaurantCreation: undefined;
  SuccessRegistration: undefined;
  NewDish: undefined;
  ViewRestaurant: undefined;
  RestaurantClient: undefined;
  ViewFavs: undefined;
  FiltersClient: undefined;
  // Feed: { sort: 'latest' | 'top' } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export function Navigation() {
  const {
    isAppInitLoading,
    auth: { jwt },
  } = useAppSelector(state => state.user);
  if (isAppInitLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTransparent: true,
          headerShadowVisible: false,
        }}>
        {!jwt ? (
          <Stack.Group>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registration" component={UserRegistration} />
            <Stack.Screen
              name="SuccessRegistration"
              component={SuccessRegistration}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              options={{
                header: ({ navigation }) => {
                  const handleHamburgerPress = () => {
                    navigation.navigate('Profile');
                  };
                  const handleFilterPress = () => {
                    navigation.navigate('FiltersClient');
                  };
                  return (
                    <HomeNavHeader
                      onHamburgerClick={handleHamburgerPress}
                      onFiltersClick={handleFilterPress}
                    />
                  );
                },
                headerShown: true,
                headerStyle: { backgroundColor: COLORS.background },
                headerTransparent: true,
              }}
              component={Home}
              name="Home"
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                animation: 'slide_from_left',
                header: ({ navigation }) => (
                  <ProfileNavHeader onPressBack={navigation.goBack} />
                ),
                headerShown: true,
                headerStyle: { backgroundColor: COLORS.background },
              }}
            />
            <Stack.Screen
              name="CreateRestaurant"
              component={CreateRestaurant}
            />
            <Stack.Screen
              name="FinishedRestaurantCreation"
              component={RestaurantCreated}
            />

            <Stack.Screen name="NewDish" component={NewDish} />

            <Stack.Screen
              name="ViewRestaurant"
              component={ViewRestaurant}
              options={{
                header: ({ navigation }) => (
                  <ProfileNavHeader onPressBack={navigation.goBack} />
                ),
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="RestaurantClient"
              component={RestaurantClient}
              options={{
                header: ({ navigation }) => (
                  <ProfileNavHeader onPressBack={navigation.goBack} />
                ),
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="ViewFavs"
              component={ViewFavs}
              options={{
                animation: 'slide_from_left',
                header: ({ navigation }) => (
                  <ProfileNavHeader onPressBack={navigation.goBack} />
                ),
                headerShown: true,
              }}
            />
            <Stack.Screen name="FiltersClient" component={FiltersClient} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
