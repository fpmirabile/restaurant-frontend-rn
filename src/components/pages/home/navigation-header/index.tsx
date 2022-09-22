import * as React from 'react';
import { View, Text } from 'react-native';
import { ImageButton } from '../../../shared/image-button';
import { styles } from './styles';

export function HomeNavHeader() {
  return (
    <View style={styles.headerContainer}>
      {/* <ImageButton /> */}
      <Text>Morfando Inc</Text>
      {/* <ImageButton /> */}
    </View>
  );
}
