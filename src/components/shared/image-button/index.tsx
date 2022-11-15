import * as React from 'react';
import {
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native';
import { SvgProps } from 'react-native-svg';
import NoAvailableImage from '../../../assets/images/no-available-image.svg';

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
      ) : imageSource ? (
        <Image style={imageStyle} source={imageSource} />
      ) : (
        <NoAvailableImage />
      )}
    </TouchableOpacity>
  );
}
