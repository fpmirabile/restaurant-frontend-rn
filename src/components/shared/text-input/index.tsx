import * as React from 'react';
import {
  StyleProp,
  TextInput,
  View,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputEndEditingEventData,
  TouchableOpacity,
  KeyboardTypeOptions,
} from 'react-native';
import { SvgProps } from 'react-native-svg';
import { COLORS, ICONS } from '../../../constants';
import { ImageButton } from '../image-button';
import { Caption } from '../morfando-text';
import { styles } from './styles';

interface PropTypes {
  placeholder?: string;
  placeholderColor?: string;
  onChangeText?: (text: string) => void;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onEndEditing?: (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => void;
  value: string;
  errorMessage?: string;
  hasError?: boolean;
  rightIcon?: React.FC<SvgProps>;
  onRightIconPress?: () => void;
  containerStyles?: StyleProp<ViewStyle>;
  onBlur?: () => void;
  secureTextEntry?: boolean;
  disabled?: boolean;
  keyboardType?: KeyboardTypeOptions;
  borderBottom?: boolean;
  onValidateText?: (text: string) => boolean;
  multiline?: boolean;
  numberOfLines?: number;
}

export function Input({
  placeholder,
  placeholderColor = COLORS.placeholder,
  onChangeText,
  errorMessage,
  hasError,
  value,
  borderBottom,
  rightIcon: RightIcon,
  containerStyles = {},
  onBlur,
  onChange,
  onEndEditing,
  onRightIconPress,
  secureTextEntry,
  disabled,
  keyboardType,
  onValidateText,
  multiline,
  numberOfLines,
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
        style={
          borderBottom
            ? styles.inputBorder
            : [styles.input, multiline && styles.inputMultiline]
        }
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        onEndEditing={handleEndEditing}
        secureTextEntry={secureTextEntry}
        editable={!disabled}
        placeholderTextColor={placeholderColor}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : undefined}
      />
      {!!RightIcon && (
        <ImageButton
          onPress={onRightIconPress}
          imageStyle={styles.rightIcon}
          imageSvg={RightIcon}
        />
      )}
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

interface PasswordInputProps extends PropTypes {}
export function PasswordInput({ ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(true);
  const showPasswordIcon = showPassword
    ? ICONS.hidePassword
    : ICONS.showPassword;

  const onPasswordIconPress = React.useCallback(() => {
    setShowPassword(!showPassword);
  }, [setShowPassword, showPassword]);

  return (
    <Input
      {...props}
      secureTextEntry={showPassword}
      rightIcon={showPasswordIcon}
      onRightIconPress={onPasswordIconPress}
    />
  );
}
