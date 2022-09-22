import * as React from 'react';
import { View, Text, FlatList, ListRenderItemInfo, Image } from 'react-native';
import { Input, ScrollPage } from '../../shared';
import { styles } from './styles';
const TestImage = require('./image.png');

interface PropTypes {}

const condition = (/*prevProps, nextProps*/) => {
  return true;
};

const RestaurantItem = React.memo(
  ({ index }: ListRenderItemInfo<any>): JSX.Element => {
    return (
      <View>
        <View>
          <Text>Paja Rota #{index}</Text>
          <Text>Parrilla</Text>
        </View>
        <Image source={TestImage} />
        <View>
          <Text>
            <Text>Direccion</Text>José M. Estrada 134, Haedo, Provincia de
            Buenos Aires - 2km
          </Text>
          <Text>
            <Text>Precio medio</Text>ARS 3500$
          </Text>
          <Text>
            <Text>Estrellas</Text>3.0
          </Text>
        </View>
      </View>
    );
  },
  condition,
);

const header = () => {
  return (
    <>
      <View style={styles.inputContainer}>
        <Input value="" placeholder="Buscar restaurantes / tipo de comida" />
      </View>
      <View style={styles.titleContainer}>
        <Text>Restaurantes cerca tuyo</Text>
      </View>
    </>
  );
};

export function Home({}: PropTypes) {
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={header}
        data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
        renderItem={React.useCallback((props: ListRenderItemInfo<any>) => {
          return <RestaurantItem {...props} />;
        }, [])}
      />
    </View>
  );
}
