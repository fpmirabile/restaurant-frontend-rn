import * as React from 'react';
import { View } from 'react-native';
import { ICONS } from '../../constants';
import { Title } from '../../components/shared';
import { ImageButton } from '../../components/shared';
import { styles } from './styles';

interface PropTypes {
  onHamburgerClick: () => void;
  onFilterClick: () => void;
}

export function HomeNavHeader({ onHamburgerClick, onFilterClick }: PropTypes) {
  return (
    <View style={styles.headerContainer}>
      <ImageButton onPress={onHamburgerClick} imageSvg={ICONS.burgerMenu} />
      <Title darkPinkColor>Morfando Inc</Title>
      <ImageButton onPress={onFilterClick} imageSvg={ICONS.filter} />
    </View>
  );
}
