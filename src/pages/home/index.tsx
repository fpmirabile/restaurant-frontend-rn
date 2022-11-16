import * as React from 'react';
import { View, FlatList, ListRenderItemInfo, Image } from 'react-native';
import { MorfandoRouterParams } from '../../navigation/navigation';
import {
  Body,
  Body2,
  ColorfulButton,
  Input,
  PressableView,
} from '../../components/shared';
import { Shadow } from 'react-native-shadow-2';
import { ICONS } from '../../constants';
import { localizedStrings } from '../../localization/localized-strings';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { actions } from '../../redux';
import { Restaurant } from '../../api/restaurant.api';
import { Rating } from '../../components/shared/rating';
import { capitalize } from '../../util/strings';
import NoAvailableImage from '../../assets/images/no-available-image.svg';
import { useAppNavigation } from '../../hook/navigation';
import { styles } from './styles';

interface PropTypes extends MorfandoRouterParams<'Home'> {}

const RestaurantItem = ({
  item,
}: ListRenderItemInfo<Restaurant>): JSX.Element => {
  const { isAdmin } = useAppSelector(state => state.user.user);
  const LikeIcon = item.favorite ? ICONS.like : ICONS.likeNoBackground;
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const handleViewNavigation = React.useCallback(() => {
    dispatch(actions.restaurants.selectRestaurant(item.id));
    navigation.push('ViewRestaurant');
  }, [navigation, dispatch, item]);

  return (
    <PressableView onPress={handleViewNavigation}>
      <Shadow
        style={styles.shadowElement}
        distance={2}
        startColor={'rgba(0, 0, 0, 0.20)'}
        endColor={'rgba(0, 0, 0, 0.03)'}
        containerStyle={styles.restaurantItemShadowContainer}
        offset={[0, 1]}>
        {item.isClosed && (
          <View style={styles.backdrop}>
            <View style={styles.backdropInnerContainer}>
              <Body center fontType="bold" style={styles.temporaryCloseFont}>
                {isAdmin ? 'Cerrado' : 'Cerrado temporalmente'}
              </Body>
            </View>
          </View>
        )}
        <View style={styles.restaurantContainer}>
          <View style={styles.restaurantTopPosition}>
            <Body fontType="bold" darkPinkColor>
              {item.name}
            </Body>
            <Body>Parrilla</Body>
          </View>
          {!isAdmin && (
            <View style={styles.restaurantTopPosition}>
              <LikeIcon />
            </View>
          )}
        </View>
        <View>
          {item.photos && item.photos.length ? (
            <Image
              style={styles.restaurantBackgroundImage}
              source={{
                uri: item.photos[0],
              }}
            />
          ) : (
            <NoAvailableImage />
          )}
        </View>
        <View style={styles.restaurantInfoContainer}>
          <Body2 style={styles.addressSize}>
            <Body fontType="bold" darkPinkColor>
              Dirección
            </Body>{' '}
            {capitalize(item.address)}
            {/* José M. Estrada 134, Haedo, Provincia de Buenos Aires - 2km */}
          </Body2>
          <Body2>
            <Body fontType="bold" darkPinkColor>
              Precio medio
            </Body>{' '}
            $$$$
          </Body2>
          <View style={styles.starsContainer}>
            <Body style={styles.starTitle} fontType="bold" darkPinkColor>
              Estrellas
            </Body>
            <Rating starSize={16} currentValue={item.stars} />
          </View>
        </View>
      </Shadow>
    </PressableView>
  );
};

const header = React.memo(() => {
  const {
    user: { isAdmin },
  } = useAppSelector(state => state.user);
  const RestaurantIcon = ICONS.restaurant;

  return (
    <View style={styles.listHeaderContainer}>
      {!isAdmin && (
        <View style={styles.inputContainer}>
          <Input
            rightIcon={require('../../assets/images/icons/search.png')}
            value=""
            placeholder="Buscar restaurantes / tipo de comida"
          />
        </View>
      )}
      <View style={styles.titleContainer}>
        <View style={styles.restaurantIcon}>{<RestaurantIcon />}</View>
        <Body fontType="bold">
          {isAdmin ? 'Mis restaurantes' : 'Restaurantes cerca tuyo'}
        </Body>
      </View>
    </View>
  );
});

export function Home({ navigation }: PropTypes) {
  const {
    user: { auth: isAdmin },
    restaurant: {
      restaurants,
      home: { loading, error },
    },
  } = useAppSelector(state => state);
  const dispatch = useAppDispatch();

  const renderItemComponent = React.useCallback(
    (props: ListRenderItemInfo<Restaurant>) => {
      const Item = React.memo(RestaurantItem);
      return <Item {...props} />;
    },
    [],
  );

  const separatorComponent = React.useCallback(() => {
    const Separator = React.memo(() => <View style={styles.listSeparator} />);
    return <Separator />;
  }, []);

  const handleNewRestaurant = React.useCallback(() => {
    navigation.push('CreateRestaurant');
  }, [navigation]);

  React.useLayoutEffect(() => {
    if (isAdmin) {
      dispatch(actions.restaurants.getNearRestaurants());
    } else {
      dispatch(actions.restaurants.getRestaurants());
    }
  }, [dispatch, isAdmin]);

  return (
    <View style={styles.container}>
      {error && <View />}
      {loading && (
        <Image
          style={styles.loadingIcon}
          resizeMode="contain"
          source={require('../../assets/images/loading/loading.gif')}
        />
      )}
      {!loading && (
        <FlatList
          ListHeaderComponent={header}
          data={restaurants}
          renderItem={renderItemComponent}
          contentContainerStyle={styles.listBodyContainer}
          ItemSeparatorComponent={separatorComponent}
        />
      )}
      {isAdmin && (
        <View style={styles.createNewRestaurantContainer}>
          <ColorfulButton
            buttonContainerStyle={styles.newRestaurantButton}
            onPress={handleNewRestaurant}
            title={localizedStrings.home.createNewRestaurant}
          />
        </View>
      )}
    </View>
  );
}
