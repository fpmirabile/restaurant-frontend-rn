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
import { Body, Title, Caption,Body2, CTAText } from '../morfando-text';

interface PropTypes { //Estas son las caracteristicas que va a cumplir esta interfaz las cosas con signo de pregunta son las que estoy aceptando que no existan
  message: string;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  containerStyles?: StyleProp<ViewStyle>;
  textColorStyle?: StyleProp<TextStyle>;
  type?: TouchebleType;
}

type TouchebleType = 'title' | 'body' | 'caption'| 'body2Darpink'|'captionDarkpink'|'ctatext' ;

export function TouchableText({
  message,
  onPress,
  onPressIn,
  onPressOut,
  containerStyles = {},//Todo lo que tiene igual, si no lo llamo cuando invoco al componente, estare tomando lo del lado derecho del igual.
  textColorStyle = {},
  type = "body",// Aca lo que digo, es que si no invoco al Type por defecto le queda Body
}: PropTypes) {

    return (
      <View style={[styles.container, containerStyles]}>
        <TouchableOpacity
          onPress={onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}>
            {type==="title"&&<Title >{message}</Title>}
            {type==="body"&&<Body center>{message}</Body>}
            {type==="body2Darpink"&&<Body2 darkpinkcolor fontType='bold'>{message}</Body2>}
            {type==="caption"&&<Caption>{message}</Caption>}
            {type==="ctatext"&&<CTAText>{message}</CTAText>}
            {type==="captionDarkpink"&&<Caption darkpinkcolor fontType='bold'>{message}</Caption>}
        </TouchableOpacity>
      </View>
    );
}
