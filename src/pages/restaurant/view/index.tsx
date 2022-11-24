import * as React from 'react';
import { Image, Switch, View } from 'react-native';
import {
  Body,
  Body2,
  CategoriesAccordion,
  ColorfulButton,
  Headline5,
  Headline6,
  ImageButton,
  OpeningList,
  ScrollPage,
} from '../../../components/shared';
import { COLORS, ICONS } from '../../../constants';
import { localizedStrings } from '../../../localization/localized-strings';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { useAppNavigation } from '../../../hook/navigation';
import { styles } from './styles';
import { actions } from '../../../redux';

interface PropTypes {}

export function ViewRestaurant({}: PropTypes) {
  const {
    view: { selectedRestaurant, loading, error },
    categories: categoriesList,
  } = useAppSelector(state => state.restaurant);
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const handleEditRestaurant = React.useCallback(() => {
    if (selectedRestaurant) {
      dispatch(actions.restaurants.editRestaurant(selectedRestaurant));
      navigation.push('CreateRestaurant');
    }
  }, [navigation, dispatch, selectedRestaurant]);

  const handleNewDish = React.useCallback(() => {
    navigation.push('NewDish');
  }, [navigation]);

  React.useEffect(() => {
    return () => {
      dispatch(actions.restaurants.cleanViewScreen());
    };
  }, [dispatch]);

  const handleOpenCloseRestaurant = React.useCallback(() => {
    if (selectedRestaurant) {
      dispatch(
        actions.restaurants.openOrCloseRestaurant(selectedRestaurant.id),
      );
    }
  }, [dispatch, selectedRestaurant]);

  const mapDays = selectedRestaurant?.openDays;
  const isOpen = !selectedRestaurant?.open;
  return (
    <ScrollPage internalContainerStyles={styles.container}>
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
          <Headline6>{localizedStrings.restaurant.view.errorMessage}</Headline6>
        </View>
      )}
      {!loading && (
        <View style={styles.containerView}>
          <View style={styles.title}>
            <Headline5 darkPinkColor>{selectedRestaurant?.name}</Headline5>
            <ImageButton onPress={handleEditRestaurant} imageSvg={ICONS.edit} />
          </View>
          <View style={styles.spaceForAdress}>
            <Body2>{selectedRestaurant?.address}</Body2>
          </View>
          <View style={styles.openingListContainer}>
            <OpeningList darkPinkColor previousDates={mapDays} />
          </View>
          <View style={styles.openRestaurent}>
            <Body>{localizedStrings.restaurant.view.openLocal}</Body>
            <Switch
              onValueChange={handleOpenCloseRestaurant}
              trackColor={{ true: COLORS.pink }}
              thumbColor={isOpen ? COLORS.darkPink : COLORS.grey}
              value={isOpen}
            />
          </View>
          <View>
            <Headline5 style={styles.title}>Categorias</Headline5>
          </View>
          <View style={styles.categoryContainer}>
            {categoriesList.length > 0 ? (
              categoriesList.map((item, index) => {
                return <CategoriesAccordion category={item} key={index} />;
              })
            ) : (
              <View style={styles.emptyCategoriesMessage}>
                <Body>{localizedStrings.restaurant.view.noCategories}</Body>
              </View>
            )}
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
