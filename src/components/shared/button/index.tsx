import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { SvgProps } from 'react-native-svg';
import { Body2 } from '../morfando-text';
import { styles } from './styles';

interface PropTypes {
  title: string;
  isLoading?: boolean;
  rightIcon?: React.FC<SvgProps>;
  leftIcon?: React.FC<SvgProps>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
  color?: 'white' | 'black';
  disabled?: boolean;
}

function Button({
  rightIcon: RightSvgIcon,
  leftIcon: LeftSvgIcon,
  isLoading = false,
  title,
  buttonContainerStyle = {},
  color = 'white',
}: PropTypes) {
  return (
    <View
      style={[
        styles.container,
        buttonContainerStyle,
        (!!RightSvgIcon || !!LeftSvgIcon) && !isLoading && styles.hasIcon,
      ]}>
      {isLoading ? (
        <Image
          style={styles.loadingIcon}
          source={require('../../../assets/images/loading/loading.gif')}
        />
      ) : (
        <>
          <View>{!!LeftSvgIcon && <LeftSvgIcon />}</View>
          <View>
            {!isLoading && (
              <Body2 fontType="bold" style={color === 'white' && styles.title}>
                {title}
              </Body2>
            )}
          </View>
          <View>{!!RightSvgIcon && <RightSvgIcon />}</View>
        </>
      )}
    </View>
  );
}

interface ColorfulButtonProps extends PropTypes {
  onPress?: () => void;
  onLongPress?: () => void;
}
export function ColorfulButton({
  onPress,
  onLongPress,
  disabled,
  ...props
}: ColorfulButtonProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Button color="white" {...props} />
    </TouchableOpacity>
  );
}

interface TransparentProps extends ColorfulButtonProps {
  size?: 'small' | 'big';
}
export function TransparentButton({
  onPress,
  onLongPress,
  size = 'small',
  buttonContainerStyle,
  disabled,
  ...props
}: TransparentProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Shadow
        style={styles.shadowContainer}
        distance={1}
        startColor={'rgba(33, 29, 66, 0.14)'}
        offset={[0, 0]}
        stretch>
        <Button
          buttonContainerStyle={[
            styles.transparent,
            size === 'big' && styles.bigTransparent,
            buttonContainerStyle,
          ]}
          color="black"
          {...props}
        />
      </Shadow>
    </TouchableOpacity>
  );
}
