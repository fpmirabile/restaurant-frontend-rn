import * as React from 'react';
import { View } from 'react-native';
import { TouchableText } from '../../components/shared';
import { styles } from './styles';

interface PropTypes {
  onPressBack: () => void;
}

export function SearchFilterNavHeader({ onPressBack }: PropTypes) {
  return (
    <View style={styles.headerContainer}>
      <TouchableText message="< Volver" onPress={onPressBack} type="ctaText" />
    </View>
  );
}
