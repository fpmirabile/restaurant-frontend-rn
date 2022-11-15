import * as React from 'react';
import { Image, Switch, View } from 'react-native';
import {
  Body,
  Body2,
  ColorfulButton,
  Headline5,
  Headline6,
  ImageButton,
  OpeningList,
  ScrollPage,
} from '../../../components/shared';
import { COLORS, ICONS } from '../../../constants';
import { AccordionList } from '../../../components/shared/accordion-list';
import { localizedStrings } from '../../../localization/localized-strings';
import { useAppNavigation } from '../../../navigation/navigation';
import { styles } from './styles';
import { useAppSelector } from '../../../redux/store';

interface PropTypes {}

export function ViewRestaurant({}: PropTypes) {
  const { selectedRestaurant, loading, error } = useAppSelector(
    state => state.restaurant.view,
  );
  const navigation = useAppNavigation();

  // const dispatch = useAppDispatch();
  const handleEditRestaurant = React.useCallback(() => {
    navigation.push('CreateRestaurant');
  }, [navigation]);

  const handleNewDish = React.useCallback(() => {
    navigation.push('NewDish');
  }, [navigation]);

  // const handleSwitchChange = React.useCallback((newValue: boolean) => {}, []);

  const categories = [
    {
      title: 'Promociones del día',
      items: [
        {
          title: 'Flan',
          imageSource: '../../../assets/images/temporal/flan-casero.png',
          price: '640$',
        },
      ],
    },
    {
      title: 'Carnes',
      items: [
        {
          title: 'Churrasco',
          imageSource: '../../../assets/images/temporal/flan-casero.png',
          price: '800$',
        },
        {
          title: 'Tira de asado',
          imageSource: '../../../assets/images/temporal/flan-casero.png',
          price: '960$',
        },
      ],
    },
    {
      title: 'Bebidas',
      items: [
        {
          title: 'Agua Mineral',
          imageSource: '../../../assets/images/temporal/flan-casero.png',
          price: '250$',
        },
      ],
    },
    {
      title: 'Postres',
      items: [
        {
          title: 'Flan',
          imageSource: '../../../assets/images/temporal/flan-casero.png',
          price: '640$',
        },
      ],
    },
  ];

  const mapDays =
    selectedRestaurant?.openDays?.map(day => {
      return {
        day: day.day,
        open: day.open,
        times: [{ from: day.openTime, to: day.closeTime }],
      };
    }) || [];
  const isOpen = !selectedRestaurant?.isClosed;
  return (
    <ScrollPage>
      {loading && (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/loading/loading.gif')}
          />
        </View>
      )}
      {error && (
        <View
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Headline6>
            Lo sentimos no podemos mostrarte la informacion sobre este
            restaurante en este momento.
          </Headline6>
        </View>
      )}
      {!loading && (
        <View style={styles.container}>
          <View style={styles.title}>
            <Headline5 style={styles.restaurantTitle}>
              {selectedRestaurant?.name}
            </Headline5>
            <ImageButton onPress={handleEditRestaurant} imageSvg={ICONS.edit} />
          </View>
          <View>
            <Body2>{selectedRestaurant?.address}</Body2>
          </View>
          <View style={styles.openingListContainer}>
            <OpeningList darkPinkColor previousDates={mapDays} />
          </View>

          <View style={styles.openRestaurent}>
            <Body>Local Abierto</Body>
            <Switch
              // onValueChange={handleSwitchChange}
              trackColor={{ true: COLORS.pink }}
              thumbColor={isOpen ? COLORS.darkPink : COLORS.grey}
              value={isOpen}
            />
          </View>

          <View>
            <Headline5 style={styles.title}>Categorias</Headline5>
          </View>
          <View style={styles.categoryContainer}>
            {categories.map((item, index) => {
              return <AccordionList category={item} key={index} />;
            })}
          </View>
          <View style={styles.createNewDishContainer}>
            <ColorfulButton
              buttonContainerStyle={styles.newDishButton}
              onPress={handleNewDish}
              title={localizedStrings.restaurant.view.createNewDish}
            />
          </View>
        </View>
      )}
    </ScrollPage>
  );
}
