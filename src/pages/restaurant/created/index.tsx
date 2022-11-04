import * as React from 'react';
import { View, Image } from 'react-native';
import {
  Caption,
  ColorfulButton,
  Title,
  TransparentButton,
} from '../../../components/shared';
import { MorfandoRouterParams } from '../../../navigation/navigation';
import { styles } from './styles';
import { localizedStrings } from '../../../localization/localized-strings';
import { useAppSelector } from '../../../redux/store';
import { ICONS } from '../../../constants';

interface PropTypes
  extends MorfandoRouterParams<'FinishedRestaurantCreation'> {}
export function RestaurantCreated({ navigation }: PropTypes) {
  const Chef = ICONS.chef;
  const { loading } = useAppSelector(state => state.restaurant.create);

  const handleContinueWithMenu = React.useCallback(() => {
    navigation.navigate('NewDish');
  }, [navigation]);
  const handleContinueLater = React.useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  return (
    <View style={styles.container}>
      {loading && (
        <Image
          // style={styles.loadingIcon}
          resizeMode="contain"
          source={require('../../../assets/images/loading/loading.gif')}
        />
      )}
      {!loading && (
        <>
          <Title>{localizedStrings.restaurant.created.title}</Title>
          <Caption>{localizedStrings.restaurant.created.subtitle}</Caption>
          <View style={styles.bottomContainer}>
            <View style={styles.imageContainer}>
              <Chef />
            </View>
            <View>
              <ColorfulButton
                buttonContainerStyle={styles.colorfulButton}
                title={localizedStrings.restaurant.created.primaryButton}
                onPress={handleContinueWithMenu}
              />
              <TransparentButton
                title={localizedStrings.restaurant.created.secondaryButton}
                onPress={handleContinueLater}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
}
