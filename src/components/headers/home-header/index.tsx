import * as React from 'react';
import { View } from 'react-native';
import { ICONS } from '../../../constants';
import { Title } from '../../shared';
import { ImageButton } from '../../shared/';
import { styles } from './styles';

interface PropTypes {
  onHamburgerClick: () => void;
}

export function HomeNavHeader({ onHamburgerClick }: PropTypes) {
  return (
    <View style={styles.headerContainer}>
      <ImageButton onPress={onHamburgerClick} imageSvg={ICONS.burgerMenu} />
      <Title darkPinkColor>Morfando Inc</Title>
      <ImageButton imageSvg={ICONS.filter} />
    </View>
  );
}
