import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { SvgProps } from 'react-native-svg';
import { Body2 } from '../morfando-text';
import { styles } from './styles';

type ButtonType = 'transparent' | 'normal';

interface PropTypes {
  title: string;
  onPress?: () => void;
  onLongPress?: () => void;
  buttonType?: ButtonType;
  rightIcon?: React.FC<SvgProps>;
}

export function Button({
  title,
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
          <Body2
            fontType="bold"
            style={[buttonType === 'normal' && styles.title]}>
            {title}
          </Body2>
          {!!SvgIcon && <SvgIcon style={styles.rightIcon} />}
        </View>
      </Shadow>
    </TouchableOpacity>
  );
}
