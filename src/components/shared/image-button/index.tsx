import * as React from 'react';
import { TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { style } from './style';

interface PropTypes {
  onPress?: () => void;
  imageSource: ImageSourcePropType;
}

export function ImageButton({ onPress, imageSource }: PropTypes) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={imageSource} />
    </TouchableOpacity>
  );
}
