import * as React from 'react';
import {
  Image,
  StyleProp,
  TextInput,
  View,
  ViewStyle,
  ImageSourcePropType,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputEndEditingEventData,
} from 'react-native';
import { Caption } from '../morfando-text';
import { styles } from './styles';

interface PropTypes {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onEndEditing?: (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => void;
  value: string;
  errorMessage?: string;
  hasError?: boolean;
  rightIcon?: ImageSourcePropType;
  borderBottom?: boolean;
  containerStyles?: StyleProp<ViewStyle>;
  onBlur?: () => void;
  secureTextEntry?: boolean;
}

export function Input({
  placeholder,
  onChangeText,
  errorMessage,
  hasError,
  value,
  borderBottom,
  rightIcon,
  containerStyles = {},
  onBlur,
  onChange,
  onEndEditing,
  secureTextEntry,
}: PropTypes) {

  return (
    <View style={[styles.container, containerStyles]}>
      <TextInput
        onChangeText={onChangeText}
        style={borderBottom? styles.inputBorder : styles.input}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        onEndEditing={onEndEditing}
        secureTextEntry={secureTextEntry}
      />
      {rightIcon && <Image style={styles.rightIcon} source={rightIcon} />}
      {!!errorMessage && hasError && (
        <Caption style={styles.errorMessage}>{errorMessage}</Caption>
      )}
    </View>
  );
}

