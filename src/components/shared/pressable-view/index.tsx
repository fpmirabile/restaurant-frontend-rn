import * as React from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';

interface PropTypes {
  children: React.ReactNode;
  containerStyles?: StyleProp<ViewStyle>;
  touchableStyles?: StyleProp<ViewStyle>;
  onPress?: () => void;
}
export function PressableView({
  children,
  containerStyles,
  onPress,
  touchableStyles,
}: PropTypes) {
  return (
    <TouchableOpacity style={touchableStyles} onPress={onPress}>
      <View style={containerStyles}>{children}</View>
    </TouchableOpacity>
  );
}
