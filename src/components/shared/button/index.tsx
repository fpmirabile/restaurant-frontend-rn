import * as React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { SvgProps } from 'react-native-svg';
import { Body2 } from '../morfando-text';
import { styles } from './styles';

type ButtonType = 'transparent' | 'normal';
interface PropTypes {
  title: string;
  isLoading?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  buttonType?: ButtonType;
  rightIcon?: React.FC<SvgProps>;
}

export function Button({
  title,
  isLoading = false,
  onPress,
  onLongPress,
  rightIcon: SvgIcon,
  buttonType = 'normal',
}: PropTypes) {
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <Shadow
        style={styles.shadowContainer}
        distance={1}
        startColor={'rgba(33, 29, 66, 0.14)'}
        offset={[0, 0]}
        stretch>
        <View
          style={[
            styles.container,
            buttonType === 'transparent' && styles.transparent,
            !!SvgIcon && styles.hasRightIcon,
          ]}>
          {!isLoading && (
            <Body2
              fontType="bold"
              style={[buttonType === 'normal' && styles.title]}>
              {title}
            </Body2>
          )}
          {isLoading && (
            <Image
              style={styles.loadingIcon}
              source={require('../../../assets/images/loading/loading.gif')}
            />
          )}
          {!!SvgIcon && <SvgIcon style={styles.rightIcon} />}
        </View>
      </Shadow>
    </TouchableOpacity>
  );
}
