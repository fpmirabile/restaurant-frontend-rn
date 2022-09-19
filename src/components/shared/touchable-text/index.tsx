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
import { AppText } from '../text-styles/appText';

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
        <AppText.Body2 center>{message}</AppText.Body2>
        {/* <Text style={[styles.message, textColorStyle]}>{message}</Text> */}
      </TouchableOpacity>
    </View>
  );
}
