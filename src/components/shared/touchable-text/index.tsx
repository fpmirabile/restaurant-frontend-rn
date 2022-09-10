import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { styles } from './styles';

interface PropTypes {
  message: string;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  containerStyles?: StyleProp<ViewStyle>;
  textColorStyle?: StyleProp<TextStyle>;
}

export function TouchableText({
  message,
  onPress,
  onPressIn,
  onPressOut,
  containerStyles = {},
  textColorStyle = {},
}: PropTypes) {
  return (
    <View style={[styles.container, containerStyles]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}>
        <Text style={[styles.message, textColorStyle]}>{message}</Text>
      </TouchableOpacity>
    </View>
  );
}
