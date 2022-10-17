import * as React from 'react';
import { View, FlatList, ListRenderItemInfo, Image } from 'react-native';
import { MorfandoRouterParams } from '../../navigation/navigation';
import { Body, Body2, Input } from '../../components/shared';
import { styles } from './styles';
import { Shadow } from 'react-native-shadow-2';
import { removeSession } from '../../api/session';
import { ICONS } from '../../constants';
const TestImage = require('../../assets/images/image.png');

interface PropTypes extends MorfandoRouterParams<'Home'> {}

const RestaurantItem = React.memo(
  ({ index }: ListRenderItemInfo<any>): JSX.Element => {
    // const favorite = index % 2 === 0;
    const disabled = index === 1;
    return (
      <Shadow
        style={styles.shadowElement}
        distance={2}
        startColor={'rgba(0, 0, 0, 0.20)'}
        endColor={'rgba(0, 0, 0, 0.03)'}
        offset={[0, 1]}>
        {disabled && (
          <View style={styles.backdrop}>
            <View style={styles.backdropInnerContainer}>
              <Body center fontType="bold" style={{ color: 'white' }}>
                Cerrado temporalmente
              </Body>
            </View>
          </View>
        )}
        <View
          style={{
            paddingHorizontal: 16,
            marginVertical: 14,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{ justifyContent: 'center' }}>
            <Body fontType="bold" darkPinkColor>
              Paja Rota #{index}
            </Body>
            <Body>Parrilla</Body>
          </View>
          <View style={{ justifyContent: 'center' }}>
            {/* <Image
              source={
                favorite
                  ?
                  : require('../../../assets/images/icons/not-fill-like.png')
              }
            /> */}
          </View>
        </View>
        <View>
          <Image style={{ width: '100%' }} source={TestImage} />
        </View>
        <View style={{ paddingHorizontal: 16, marginVertical: 16 }}>
          <Body2>
            <Body fontType="bold" darkPinkColor>
              Direccion
            </Body>{' '}
            José M. Estrada 134, Haedo, Provincia de Buenos Aires - 2km
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
  const RestaurantIcon = React.memo(ICONS.restaurant);

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

export function Home({}: PropTypes) {
  removeSession();
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={header}
        data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
        renderItem={React.useCallback((props: ListRenderItemInfo<any>) => {
          return <RestaurantItem {...props} />;
        }, [])}
        contentContainerStyle={{
          padding: 16,
        }}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                marginVertical: 8,
              }}
            />
          );
        }}
      />
    </View>
  );
}
