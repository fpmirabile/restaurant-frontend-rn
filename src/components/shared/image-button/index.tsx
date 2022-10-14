import * as React from 'react';
import {
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native';
import { SvgProps } from 'react-native-svg';

interface PropTypes {
  onPress?: () => void;
  imageStyle?: ImageStyle;
  imageSource?: ImageSourcePropType;
  imageSvg?: React.FC<SvgProps>;
}

export function ImageButton({
  onPress,
  imageStyle = {},
  imageSource,
  imageSvg: ImageSVG,
}: PropTypes) {
  return (
    <TouchableOpacity onPress={onPress}>
      {ImageSVG ? (
        <ImageSVG style={imageStyle} />
      ) : (
        <Image
          style={imageStyle}
          source={
            imageSource || require('../../../assets/images/not-found.png')
          }
        />
      )}
    </TouchableOpacity>
  );
}
