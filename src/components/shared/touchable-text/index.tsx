import * as React from 'react';
import {
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { styles } from './styles';
import { Body, Title, Caption, Body2, CTAText } from '../morfando-text';

interface PropTypes {
  message: string;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  containerStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
  type?: TouchableType;
}

type TouchableType =
| 'title'
| 'body'
| 'bodyDarkPink'
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
  textStyles = {},
  type = 'body',
}: PropTypes) {
  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      <View style={[styles.container, containerStyles]}>
        {type === 'title' && <Title style={textStyles}>{message}</Title>}
        {type === 'body' && (
          <Body style={textStyles} center>
            {message}
          </Body>
        )}
        {type === 'body2DarkPink' && (
          <Body2 style={textStyles} darkPinkColor fontType="bold">
            {message}
          </Body2>
        )}
        {type === 'bodyDarkPink' && (
          <Body style={textStyles} darkPinkColor fontType="bold">
            {message}
          </Body>
        )}
        {type === 'caption' && <Caption style={textStyles}>{message}</Caption>}
        {type === 'ctaText' && <CTAText style={textStyles}>{message}</CTAText>}
        {type === 'captionDarkPink' && (
          <Caption style={textStyles} darkPinkColor fontType="bold">
            {message}
          </Caption>
        )}
      </View>
    </TouchableOpacity>
  );
}
