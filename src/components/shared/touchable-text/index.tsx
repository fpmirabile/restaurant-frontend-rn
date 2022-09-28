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
import { Body, Title, Caption, Body2, CTAText } from '../';

interface PropTypes {
  message: string;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  containerStyles?: StyleProp<ViewStyle>;
  textColorStyle?: StyleProp<TextStyle>;
  type?: TouchableType;
}

type TouchableType =
  | 'title'
  | 'body'
  | 'caption'
  | 'body2DarkPink'
  | 'captionDarkPink'
  | 'ctaText';

export function TouchableText({
  message,
  onPress,
  onPressIn,
  onPressOut,
  containerStyles = {},
  type = 'body',
}: PropTypes) {
  return (
    <View style={[styles.container, containerStyles]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}>
        {type === 'title' && <Title>{message}</Title>}
        {type === 'body' && <Body center>{message}</Body>}
        {type === 'body2DarkPink' && (
          <Body2 darkPinkColor fontType="bold">
            {message}
          </Body2>
        )}
        {type === 'caption' && <Caption>{message}</Caption>}
        {type === 'ctaText' && <CTAText>{message}</CTAText>}
        {type === 'captionDarkPink' && (
          <Caption darkPinkColor fontType="bold">
            {message}
          </Caption>
        )}
      </TouchableOpacity>
    </View>
  );
}
