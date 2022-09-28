import * as React from 'react';
import { ImageSourcePropType } from 'react-native';
import { Image, StyleProp, TextInput, View, ViewStyle } from 'react-native';
import { styles } from './styles';

interface PropTypes {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value: string;
  rightIcon?: ImageSourcePropType;
  containerStyles?: StyleProp<ViewStyle>;
}

export function Input({
  placeholder,
  onChangeText,
  value,
  rightIcon,
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
      {rightIcon && <Image style={styles.rightIcon} source={rightIcon} />}
    </View>
  );
}
