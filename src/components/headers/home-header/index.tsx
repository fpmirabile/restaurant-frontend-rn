import * as React from 'react';
import { Image, View } from 'react-native';
import { Title } from '../../shared';
import { styles } from './styles';

export function HomeNavHeader() {
  return (
    <View style={styles.headerContainer}>
      <Image source={require('../../../assets/images/icons/burger-icon.png')} />
      <Title darkPinkColor>Morfando Inc</Title>
      <Image source={require('../../../assets/images/icons/filter-icon.png')} />
    </View>
  );
}
