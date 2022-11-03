import * as React from 'react';
import { View } from 'react-native';
import {
  Caption,
  ColorfulButton,
  Title,
  TransparentButton,
} from '../../../components/shared';
import ChefImage from '../../../assets/images/chef.svg';
import { MorfandoRouterParams } from '../../../navigation/navigation';
import { styles } from './styles';
import { localizedStrings } from '../../../localization/localized-strings';
import { NewDish } from '../../new-dish';

interface PropTypes
  extends MorfandoRouterParams<'FinishedRestaurantCreation'> {}
export function RestaurantCreated({ navigation }: PropTypes) {
  const handleGoToMenu = React.useCallback(() => {navigation.navigate('NewDish')}, [navigation]);
  const handleContinueLater = React.useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Title>{localizedStrings.restaurant.created.title}</Title>
      <Caption>{localizedStrings.restaurant.created.subtitle}</Caption>
      <View style={styles.bottomContainer}>
        <View style={styles.imageContainer}>
          <ChefImage />
        </View>
        <View>
          <ColorfulButton
            buttonContainerStyle={styles.colorfulButton}
            title={localizedStrings.restaurant.created.primaryButton}
            onPress={handleGoToMenu}
          />
          <TransparentButton
            title={localizedStrings.restaurant.created.secondaryButton}
            onPress={handleContinueLater}
          />
        </View>
      </View>
    </View>
  );
}
