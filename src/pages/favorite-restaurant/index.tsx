import * as React from 'react';
import { View, FlatList, ListRenderItemInfo, Image } from 'react-native';
import { MorfandoRouterParams } from '../../navigation/navigation';
import {
  Body,
  Body2,
  CTAText,
  Headline6,
  PressableView,
  Title,
} from '../../components/shared';
import { Shadow } from 'react-native-shadow-2';
import { ICONS, IMAGES } from '../../constants';
import { localizedStrings } from '../../localization/localized-strings';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { actions } from '../../redux';
import { Restaurant } from '../../api/restaurant.api';
import { Rating } from '../../components/shared/rating';
import { capitalize } from '../../util/strings';
import NoAvailableImage from '../../assets/images/no-available-image.svg';
import { useAppNavigation } from '../../hook/navigation';
import { styles } from './styles';

interface PropTypes extends MorfandoRouterParams<'ViewFavs'> {}

const RestaurantItem = ({
  item,
}: ListRenderItemInfo<Restaurant>): JSX.Element => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const handleViewNavigation = React.useCallback(() => {
    dispatch(actions.restaurants.selectRestaurant(item.id));
    navigation.push('RestaurantClient');
  }, [navigation, dispatch, item]);

  return (
    <View style={styles.restaurantsContainer}>
      <PressableView onPress={handleViewNavigation}>
        <Shadow
          style={styles.shadowElement}
          distance={2}
          startColor={'rgba(0, 0, 0, 0.20)'}
          endColor={'rgba(0, 0, 0, 0.03)'}
          containerStyle={styles.restaurantItemShadowContainer}
          offset={[0, 1]}>
          <View style={styles.restaurantContainer}>
            <View style={styles.restaurantTopPosition}>
              <Body fontType="bold" darkPinkColor>
                {item.name}
              </Body>
              <Body>{item.foodType}</Body>
            </View>
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
            </Body2>
            <Body2>
              <Body fontType="bold" darkPinkColor>
                Precio medio
              </Body>{' '}
              {item.priceRange}
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
    </View>
  );
};

const header = React.memo(() => {
  const RestaurantIcon = ICONS.restaurant;
  return (
    <View style={styles.headerContainer}>
      <View style={styles.listHeaderContainer}>
        <View style={styles.title}>
          <Title darkPinkColor>{localizedStrings.profile.myLikes}</Title>
        </View>
        <View style={styles.titleContainer}>
          <View style={styles.restaurantIcon}>{<RestaurantIcon />}</View>
          <CTAText>Restaurantes favoritos</CTAText>
        </View>
      </View>
    </View>
  );
});

const listEmpty = React.memo(() => {
  const SadBurger = IMAGES.sadBurger;
  return (
    <View style={styles.listEmpty}>
      <View>
        <Headline6 darkPinkColor>Ups, no encontramos nada por aquí</Headline6>
      </View>
      <View style={styles.bodyEmpty}>
        <SadBurger />
      </View>
    </View>
  );
});

export function ViewFavs({}: PropTypes) {
  const {
    restaurant: {
      favorites: restaurants,
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

  React.useLayoutEffect(() => {
    dispatch(actions.restaurants.getFavorites());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {error && <View />}
      {loading && (
        <View style={styles.loadingBody}>
          <Image
            style={styles.loadingIcon}
            resizeMode="contain"
            source={require('../../assets/images/loading/loading.gif')}
          />
        </View>
      )}
      {!loading && (
        <FlatList
          ListHeaderComponent={header}
          data={restaurants}
          renderItem={renderItemComponent}
          contentContainerStyle={
            restaurants.length > 0
              ? styles.listBodyContainer
              : styles.listBodyContainerEmpty
          }
          ItemSeparatorComponent={separatorComponent}
          ListEmptyComponent={listEmpty}
        />
      )}
    </View>
  );
}
