import * as React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { styles } from './styles';

interface PropTypes {
  title: string;
  containerStyles?: StyleProp<ViewStyle>;
}

export function Title({ title, containerStyles = {} }: PropTypes) {
  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
