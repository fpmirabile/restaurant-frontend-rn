import * as React from 'react';
import { View, FlatList, ListRenderItemInfo, Image } from 'react-native';
import { MorfandoRouterParams } from '../../navigation/navigation';
import {
  Body,
  Body2,
  ColorfulButton,
  CTAText,
  Headline6,
  Input,
  PressableView,
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
import { Body3, Title2 } from '../../components/shared/morfando-text';

interface PropTypes extends MorfandoRouterParams<'Home'> {}

const RestaurantItem = ({
  item,
}: ListRenderItemInfo<Restaurant>): JSX.Element => {
  const { isAdmin } = useAppSelector(state => state.user.user);
  const [isFavorite, setFavorite] = React.useState(item.favorite);
  const LikeIcon = isFavorite ? ICONS.like : ICONS.likeNoBackground;
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const handleViewNavigation = React.useCallback(() => {
    dispatch(actions.restaurants.selectRestaurant(item.id));
    navigation.push(isAdmin ? 'ViewRestaurant' : 'RestaurantClient');
  }, [navigation, dispatch, item, isAdmin]);

  const putFavorite = React.useCallback(() => {
    dispatch(actions.restaurants.putFavorite(item.id));
    setFavorite(!isFavorite);
  }, [dispatch, item, isFavorite]);

  return (
    <PressableView onPress={handleViewNavigation}>
      <Shadow
        style={styles.shadowElement}
        distance={2}
        startColor={'rgba(0, 0, 0, 0.20)'}
        endColor={'rgba(0, 0, 0, 0.03)'}
        containerStyle={styles.restaurantItemShadowContainer}
        offset={[0, 1]}
        paintInside={false}>
        {item.open && (
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
            <Title2 darkPinkColor>{item.name}</Title2>
            <Body>{item.foodType}</Body>
          </View>
          {!isAdmin && (
            <PressableView
              onPress={putFavorite}
              containerStyles={styles.restaurantTopPosition}>
              <LikeIcon />
            </PressableView>
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
            <NoAvailableImage width={'100%'} />
          )}
        </View>
        <View style={styles.restaurantInfoContainer}>
          <Body2 style={styles.addressSize}>
            <Body3 darkPinkColor>Dirección</Body3> {capitalize(item.address)}
          </Body2>
          <Body2>
            <Body3 darkPinkColor>Precio medio</Body3> {item.priceRange}
          </Body2>
          <View style={styles.starsContainer}>
            <Body3 style={styles.starTitle} darkPinkColor>
              Estrellas
            </Body3>
            <Rating disabled starSize={16} currentValue={item.stars} />
          </View>
        </View>
      </Shadow>
    </PressableView>
  );
};

const header = React.memo(() => {
  const {
    user: {
      user: { isAdmin },
    },
    restaurant: {
      filterText,
      home: { error },
    },
  } = useAppSelector(state => state);
  const dispatch = useAppDispatch();
  const RestaurantIcon = ICONS.restaurant;

  const handleInputEditing = React.useCallback(
    (text: string) => {
      dispatch(actions.restaurants.filterByName(text));
    },
    [dispatch],
  );

  const handleClickOnX = React.useCallback(() => {
    if (filterText) {
      dispatch(actions.restaurants.filterByName(''));
    }
  }, [dispatch, filterText]);

  const rightIcon = !filterText ? ICONS.search : ICONS.closeIcon;
  return (
    <View style={styles.listHeaderContainer}>
      {!isAdmin && (
        <View style={styles.inputContainer}>
          <Input
            onChangeText={handleInputEditing}
            rightIcon={rightIcon}
            onRightIconPress={handleClickOnX}
            value={filterText}
            placeholder="Buscar restaurantes / tipo de comida"
          />
        </View>
      )}
      {error && (
        <View>
          <Body>${error}</Body>
        </View>
      )}
      <View style={styles.titleContainer}>
        <View style={styles.restaurantIcon}>{<RestaurantIcon />}</View>
        <CTAText>
          {isAdmin ? 'Mis restaurantes' : 'Restaurantes cerca tuyo'}
        </CTAText>
      </View>
    </View>
  );
});

const listEmpty = React.memo(() => {
  const {
    user: {
      user: { isAdmin },
    },
  } = useAppSelector(state => state);
  const SadBurger = IMAGES.sadBurger;

  return (
    <View
      style={{
        flexGrow: 1,
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{ flex: 1 }}>
        <Headline6 darkPinkColor>
          {isAdmin
            ? 'Aun no cargaste ningùn Restaurant'
            : 'Parece no haber restaurants cerca tuyo'}
        </Headline6>
      </View>
      <View style={{ flex: 1 }}>
        <SadBurger />
      </View>
    </View>
  );
});

export function Home({ navigation }: PropTypes) {
  const {
    user: {
      user: { isAdmin },
    },
    restaurant: {
      listRestaurants: restaurants,
      home: { loading },
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

  const handleReload = React.useCallback(() => {
    if (!isAdmin) {
      dispatch(actions.restaurants.getNearRestaurants());
    } else {
      dispatch(actions.restaurants.getRestaurants());
    }
  }, [dispatch, isAdmin]);

  React.useLayoutEffect(() => {
    handleReload();
  }, [handleReload]);

  React.useEffect(() => {
    if (isAdmin) {
      dispatch(actions.place.getProvinces());
    }
  }, [dispatch, isAdmin]);

  return (
    <View style={styles.container}>
      {loading && (
        <Image
          style={styles.loadingIcon}
          resizeMode="contain"
          source={require('../../assets/images/loading/loading.gif')}
        />
      )}
      {!loading && (
        <FlatList
          refreshing={loading}
          onRefresh={handleReload}
          ListHeaderComponent={header}
          data={restaurants}
          renderItem={renderItemComponent}
          contentContainerStyle={styles.listBodyContainer}
          ItemSeparatorComponent={separatorComponent}
          ListEmptyComponent={listEmpty}
          keyExtractor={item => item.id.toString()}
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
