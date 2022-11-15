import * as React from 'react';
import { View } from 'react-native';
import {
  Caption,
  ColorfulButton,
  Title,
  TransparentButton,
} from '../../../components/shared';
import { MorfandoRouterParams } from '../../../navigation/navigation';
import { styles } from './styles';
import { localizedStrings } from '../../../localization/localized-strings';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { ICONS } from '../../../constants';
import { actions } from '../../../redux';

interface PropTypes
  extends MorfandoRouterParams<'FinishedRestaurantCreation'> {}
export function RestaurantCreated({ navigation }: PropTypes) {
  const dispatch = useAppDispatch();
  const Chef = ICONS.chef;
  const { loading, error } = useAppSelector(state => state.restaurant.create);

  const handleContinueWithMenu = React.useCallback(() => {
    navigation.navigate('NewDish');
  }, [navigation]);
  const handleContinueLater = React.useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  React.useEffect(() => {
    if (!loading && !error) {
      dispatch(actions.restaurants.getRestaurants());
    }
  }, [dispatch, loading, error]);

  return (
    <View style={styles.container}>
      <Title>{localizedStrings.restaurant.created.title(loading, error)}</Title>
      {!loading && !error && (
        <Caption>{localizedStrings.restaurant.created.subtitle}</Caption>
      )}
      <View style={styles.bottomContainer}>
        <View style={styles.imageContainer}>
          <Chef />
        </View>
        {!loading && (
          <View>
            {!error && (
              <ColorfulButton
                buttonContainerStyle={styles.colorfulButton}
                title={localizedStrings.restaurant.created.primaryButton}
                onPress={handleContinueWithMenu}
              />
            )}
            <TransparentButton
              title={localizedStrings.restaurant.created.secondaryButton}
              onPress={handleContinueLater}
            />
          </View>
        )}
      </View>
    </View>
  );
}
