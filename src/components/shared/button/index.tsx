import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

type ButtonType = 'transparent' | 'normal';

interface PropTypes {
  title: string;
  onPress?: () => void;
  onLongPress?: () => void;
  buttonType?: ButtonType;
}

export function Button({ title, onPress, onLongPress }: PropTypes) {
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
