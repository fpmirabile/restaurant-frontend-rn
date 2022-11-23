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
  const [errorImage, setError] = React.useState(false);

  const handleImageSourceError = React.useCallback(() => {
    setError(true);
  }, [setError]);

  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress}>
      {ImageSVG ? (
        <ImageSVG style={imageStyle} />
      ) : imageSource && !errorImage ? (
        <Image
          style={imageStyle}
          source={imageSource}
          onError={handleImageSourceError}
        />
      ) : (
        <NoAvailableImage style={imageStyle} />
      )}
    </TouchableOpacity>
  );
}
