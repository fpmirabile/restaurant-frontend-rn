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
  TouchableOpacity,
  KeyboardTypeOptions,
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
  containerStyles?: StyleProp<ViewStyle>;
  onBlur?: () => void;
  secureTextEntry?: boolean;
  disabled?: boolean;
  keyboardType?: KeyboardTypeOptions;
  borderBottom?: boolean;
  onValidateText?: (text: string) => boolean;
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
  disabled,
  keyboardType,
  onValidateText,
}: PropTypes) {
  const [isValid, setIsValid] = React.useState<boolean>(true);
  const handleEndEditing = React.useCallback(
    (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
      if (onEndEditing) {
        onEndEditing(e);
      }

      if (onValidateText) {
        setIsValid(onValidateText(e.nativeEvent.text));
      }
    },
    [onEndEditing, setIsValid, onValidateText],
  );

  return (
    <View style={[styles.container, containerStyles]}>
      <TextInput
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        style={borderBottom ? styles.inputBorder : styles.input}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        onEndEditing={handleEndEditing}
        secureTextEntry={secureTextEntry}
        editable={!disabled}
      />
      {rightIcon && <Image style={styles.rightIcon} source={rightIcon} />}
      {!!errorMessage && (hasError || !isValid) && (
        <Caption style={styles.errorMessage}>{errorMessage}</Caption>
      )}
    </View>
  );
}

interface PressableProps extends PropTypes {
  onPress: () => void;
  touchableStyles?: StyleProp<ViewStyle>;
}
export function PressableInput({
  onPress,
  touchableStyles,
  ...props
}: PressableProps) {
  return (
    <TouchableOpacity
      style={[styles.touchableInput, touchableStyles]}
      onPress={onPress}>
      <Input {...props} disabled />
    </TouchableOpacity>
  );
}
