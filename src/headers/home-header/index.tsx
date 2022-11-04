import * as React from 'react';
import { View } from 'react-native';
import { ICONS } from '../../constants';
import { Title } from '../../components/shared';
import { ImageButton } from '../../components/shared';
import { styles } from './styles';
import { useAppSelector } from '../../redux/store';

interface PropTypes {
  onHamburgerClick: () => void;
}

export function HomeNavHeader({ onHamburgerClick }: PropTypes) {
  const {
    user: { name, isAdmin },
  } = useAppSelector(state => state.user);
  return (
    <View style={styles.headerContainer}>
      <View>
        <ImageButton onPress={onHamburgerClick} imageSvg={ICONS.burgerMenu} />
      </View>
      <View>
        <Title style={isAdmin && styles.reduceFontSize} darkPinkColor>
          {isAdmin ? `Hola ${name}` : 'Morfando Inc'}
        </Title>
      </View>
      <View>{!isAdmin && <ImageButton imageSvg={ICONS.filter} />}</View>
    </View>
  );
}
