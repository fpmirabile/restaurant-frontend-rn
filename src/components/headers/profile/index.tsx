import * as React from 'react';
import { View } from 'react-native';
import { TouchableText } from '../../shared';
import { styles } from './styles';

interface PropTypes {
  onPressBack: () => void;
}

export function ProfileNavHeader({ onPressBack }: PropTypes) {
  return (
    <View style={styles.headerContainer}>
      <TouchableText message="< Volver" onPress={onPressBack} type="title" />
    </View>
  );
}
