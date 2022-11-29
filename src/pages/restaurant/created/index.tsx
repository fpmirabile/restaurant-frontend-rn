import * as React from 'react';
import { View } from 'react-native';
import {
  Body,
  ColorfulButton,
  Title,
  TransparentButton,
} from '../../../components/shared';
import { MorfandoRouterParams } from '../../../navigation/navigation';
import { localizedStrings } from '../../../localization/localized-strings';
import { useAppSelector } from '../../../redux/store';
import { ICONS } from '../../../constants';
import { styles } from './styles';

interface PropTypes
  extends MorfandoRouterParams<'FinishedRestaurantCreation'> {}
export function RestaurantCreated({ navigation, route }: PropTypes) {
  const { isEdit } = route.params;
  const Chef = ICONS.chef;
  const { loading, error } = useAppSelector(state => state.restaurant.create);

  const handleContinueWithMenu = React.useCallback(() => {
    navigation.navigate('NewDish');
  }, [navigation]);
  const handleContinueLater = React.useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Title>{localizedStrings.restaurant.created.title(loading, error)}</Title>
      {!loading && !error && (
        <View>
          {isEdit ? (
            <Body>{localizedStrings.restaurant.created.subtitleEdit}</Body>
          ) : (
            <View>
              <Body>{localizedStrings.restaurant.created.subtitle}</Body>
            </View>
          )}
        </View>
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
