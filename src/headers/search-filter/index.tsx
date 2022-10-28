import * as React from 'react';
import { View } from 'react-native';
import { Title, TouchableText } from '../../components/shared';
import { styles } from './styles';

interface PropTypes {
  onPressBack: () => void;
}

export function SearchFilterNavHeader({ onPressBack }: PropTypes) {
  return (
    <View style={styles.headerContainer}>
      <TouchableText message="x" onPress={onPressBack} type="title" />
      <Title>Filtros</Title>
    </View>
  );
}
