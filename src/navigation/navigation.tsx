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
  SearchFilter,
  SuccessRegistration,
} from '../pages';
import { HomeNavHeader, ProfileNavHeader } from '../headers';
import { useAppSelector } from '../redux/store';
import { LoadingScreen } from '../components/loading-screen';
import { CreateRestaurant, RestaurantCreated } from '../pages/restaurant';
// import { SearchFilter } from '../pages/search-filter';
import { SearchFilterNavHeader } from '../headers/search-filter';

export interface MorfandoRouterParams<A extends keyof RootStackParamList>
  extends NativeStackScreenProps<RootStackParamList, A> {}

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Registration: undefined;
  Profile: undefined;
  CreateRestaurant: undefined;
  FinishedRestaurantCreation: undefined;
  SearchFilter: undefined;
  SuccessRegistration: undefined;
  // Feed: { sort: 'latest' | 'top' } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export function Navigation() {
  const {
    isAppInitLoading,
    auth: { username },
  } = useAppSelector(state => state.general);
  if (isAppInitLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!username ? (
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
                    navigation.navigate('SearchFilter');
                  };

                  return (
                    <HomeNavHeader
                      onHamburgerClick={handleHamburgerPress}
                      onFilterClick={handleFilterPress}
                    />
                  );
                },
                headerShown: true,
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
            {
              <Stack.Screen
                name="SearchFilter"
                component={SearchFilter}
                options={{
                  animation: 'slide_from_right',
                  header: ({ navigation }) => (
                    <SearchFilterNavHeader onPressBack={navigation.goBack} />
                  ),
                  headerShown: true,
                }}
              />
            }
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
