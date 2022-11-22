import * as React from 'react';
import { View } from 'react-native';
import { ICONS } from '../../constants';
import { Title } from '../../components/shared';
import { ImageButton } from '../../components/shared';
import { styles } from './styles';
import { useAppSelector } from '../../redux/store';

interface PropTypes {
  onHamburgerClick: () => void;
  onFiltersClick?: () => void;
}

export function HomeNavHeader({ onHamburgerClick, onFiltersClick }: PropTypes) {
  const {
    user: { name, isAdmin },
  } = useAppSelector(state => state.user);

  return (
    <View style={[styles.headerContainer, isAdmin && styles.adminHeader]}>
      <View>
        <ImageButton onPress={onHamburgerClick} imageSvg={ICONS.burgerMenu} />
      </View>
      <View>
        <Title style={isAdmin && styles.reduceFontSize} darkPinkColor>
          {isAdmin ? `Hola ${name}` : 'Morfando Inc'}
        </Title>
      </View>
      <View>
        {!isAdmin && (
          <ImageButton onPress={onFiltersClick} imageSvg={ICONS.filter} />
        )}
      </View>
    </View>
  );
}
