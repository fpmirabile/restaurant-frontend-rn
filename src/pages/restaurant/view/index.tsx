import * as React from 'react';
import { Switch, View } from 'react-native';
import {
  Body,
  Body2,
  ColorfulButton,
  Headline5,
  ImageButton,
  OpeningList,
} from '../../../components/shared';
import { MorfandoRouterParams } from '../../../navigation/navigation';
import { styles } from './styles';
import { COLORS, ICONS } from '../../../constants';
import { AccordionList } from '../../../components/shared/accordion-list';
import { localizedStrings } from '../../../localization/localized-strings';
import { TimeInput } from '../../../components/shared/opening-list';

interface PropTypes extends MorfandoRouterParams<'ViewRestaurant'> {}

export function ViewRestaurant({ navigation }: PropTypes) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleEditRestaurant = React.useCallback(() => {
    navigation.push('CreateRestaurant');
  }, [navigation]);

  const handleNewDish = React.useCallback(() => {
    // navigation.push('CreateRestaurant');
    navigation.push('NewDish');
  }, [navigation]);

  const handleSwitchChange = React.useCallback(
    (newValue: boolean) => {
      setIsOpen(newValue);
    },
    [setIsOpen],
  );

  type Days = 'L' | 'M' | 'X' | 'J' | 'V' | 'S' | 'D';
  type OpenDays = {
    day: Days;
    open: boolean;
    times: TimeInput[];
  };

  const days = [
    {
      day: 'L',
      open: true,
      times: [
        { from: '10:30', to: '18:00' },
        { from: '19:30', to: '23:00' },
      ],
    },
    {
      day: 'M',
      open: true,
      times: [
        { from: '10:30', to: '18:00' },
        { from: '19:30', to: '23:00' },
      ],
    },
    {
      day: 'X',
      open: true,
      times: [
        { from: '10:30', to: '18:00' },
        { from: '19:30', to: '23:00' },
      ],
    },
    {
      day: 'J',
      open: false,
      times: [],
    },
    {
      day: 'V',
      open: true,
      times: [{ from: '10:30', to: '18:00' }],
    },
    {
      day: 'S',
      open: false,
      times: [],
    },
    {
      day: 'D',
      open: false,
      times: [],
    },
  ];

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

  // source={require('../../../assets/images/temporal/flan-casero.png')}

  // type Category = {
  //   title: string;
  //   items: ItemCategory[];
  // };

  // export type ItemCategory = {
  //   title: string;
  //   imageSource: string;
  //   price: string;
  // };

  const day: OpenDays[] = [];
  days.map(d => day.push(d));

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Headline5 style={styles.restaurantTitle}>{'Paja Rota'}</Headline5>
        <ImageButton onPress={handleEditRestaurant} imageSvg={ICONS.edit} />
      </View>

      <View>
        <Body2 style={styles.restaurantAdress}>
          José M. Estrada 134, B1706 Haedo, Provincia de Buenos Aires
        </Body2>
      </View>

      <View style={styles.openingListContainer}>
        <OpeningList darkPinkColor previousDates={day} />
      </View>

      <View style={styles.openRestaurent}>
        <Body>Local Abierto</Body>
        <Switch
          onValueChange={handleSwitchChange}
          trackColor={{ true: COLORS.pink }}
          thumbColor={isOpen ? COLORS.darkPink : COLORS.grey}
          value={isOpen}
        />
      </View>

      <View>
        <Headline5 style={styles.title}>{'Categorias'}</Headline5>
      </View>

      <View style={styles.categoryContainer}>
        {categories.map((item, index) => {
          return <AccordionList category={item} key={index} />;
        })}

        {/* <AccordionList
          title={'Promociones del día'}
          bodyText={'El mejor restaurant'}
        />
        <AccordionList title={'Carnes'} bodyText={'El mejor restaurant'} />
        <AccordionList title={'Bebidas'} bodyText={'El mejor restaurant'} />
        <AccordionList title={'Postres'} bodyText={'El mejor restaurant'} /> */}
      </View>

      <View style={styles.createNewDishContainer}>
        <ColorfulButton
          buttonContainerStyle={styles.newDishButton}
          onPress={handleNewDish}
          title={localizedStrings.restaurant.view.createNewDish}
        />
      </View>
    </View>
  );
}
