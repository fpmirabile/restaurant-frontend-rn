import * as React from 'react';
import { View } from 'react-native';
import { TouchableText } from '../../components/shared';
import { ICONS } from '../../constants';
import { styles } from './styles';

interface PropTypes {
  onPressBack: () => void;
}

export function ProfileNavHeader({ onPressBack }: PropTypes) {
  const { leftChevron: LeftChevron } = ICONS;
  return (
    <View style={styles.headerContainer}>
      <LeftChevron />
      <TouchableText message="Volver" onPress={onPressBack} type="ctaText" />
    </View>
  );
}
