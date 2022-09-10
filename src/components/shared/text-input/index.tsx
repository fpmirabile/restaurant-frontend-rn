import * as React from 'react';
import { StyleProp, TextInput, View, ViewStyle } from 'react-native';
import { styles } from './styles';

interface PropTypes {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value: string;
  // rightIcon?: any;
  containerStyles?: StyleProp<ViewStyle>;
}

export function Input({
  placeholder,
  onChangeText,
  value,
  containerStyles = {},
}: PropTypes) {
  return (
    <View style={[styles.container, containerStyles]}>
      <TextInput
        onChangeText={onChangeText}
        style={styles.input}
        placeholder={placeholder}
        value={value}
      />
    </View>
  );
}
