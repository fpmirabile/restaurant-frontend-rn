import * as React from 'react';
import { View, FlatList, ListRenderItemInfo, Image } from 'react-native';
import { MorfandoRouterParams } from '../../navigation/navigation';
import { Body, Body2, ColorfulButton, Input } from '../../components/shared';
import { styles } from './styles';
import { Shadow } from 'react-native-shadow-2';
import { ICONS } from '../../constants';
import { localizedStrings } from '../../localization/localized-strings';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { actions } from '../../redux';
import { Restaurant } from '../../api/restaurant.api';
const TestImage = require('../../assets/images/image.png');

interface PropTypes extends MorfandoRouterParams<'Home'> {}

const RestaurantItem = React.memo(
  ({ index, item }: ListRenderItemInfo<Restaurant>): JSX.Element => {
    const LikeIcon = ICONS.likeNoBackground;
    // const favorite = index % 2 === 0;
    const disabled = index === 1;
    return (
      <Shadow
        style={styles.shadowElement}
        distance={2}
        startColor={'rgba(0, 0, 0, 0.20)'}
        endColor={'rgba(0, 0, 0, 0.03)'}
        containerStyle={{ flex: 1 }}
        offset={[0, 1]}>
        {disabled && (
          <View style={styles.backdrop}>
            <View style={styles.backdropInnerContainer}>
              <Body center fontType="bold" style={styles.temporaryCloseFont}>
                Cerrado temporalmente
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
          <View style={styles.restaurantTopPosition}>
            <LikeIcon />
          </View>
        </View>
        <View>
          <Image style={styles.restaurantBackgroundImage} source={TestImage} />
        </View>
        <View style={styles.restaurantInfoContainer}>
          <Body2 style={styles.addressSize}>
            <Body fontType="bold" darkPinkColor>
              Direccion
            </Body>{' '}
            {item.address}
            {/* José M. Estrada 134, Haedo, Provincia de Buenos Aires - 2km */}
          </Body2>
          <Body2>
            <Body fontType="bold" darkPinkColor>
              Precio medio
            </Body>{' '}
            ARS 3500$
          </Body2>
          <Body2>
            <Body fontType="bold" darkPinkColor>
              Estrellas
            </Body>{' '}
            3.0
          </Body2>
        </View>
      </Shadow>
    );
  },
);

const header = () => {
  const RestaurantIcon = ICONS.restaurant;

  return (
    <View style={styles.listHeaderContainer}>
      <View style={styles.inputContainer}>
        <Input
          rightIcon={require('../../assets/images/icons/search.png')}
          value=""
          placeholder="Buscar restaurantes / tipo de comida"
        />
      </View>
      <View style={styles.titleContainer}>
        <View style={styles.restaurantIcon}>{<RestaurantIcon />}</View>
        <Body fontType="bold">Restaurantes cerca tuyo</Body>
      </View>
    </View>
  );
};

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
    dispatch(actions.restaurants.getRestaurants());
  }, [dispatch]);

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
