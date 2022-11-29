import * as React from 'react';
import {
  View,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from 'react-native';
import {
  ColorfulButton,
  Input,
  PasswordInput,
  TouchableText,
} from '../../../components/shared';
import { styles } from './styles';
import { Body, Caption } from '../../../components/shared/morfando-text';
import { localizedStrings } from '../../../localization/localized-strings';
import { LoginForm } from '..';
import { isValidEmail } from '../../../util/validation';
import { useAppSelector } from '../../../redux/store';

type InputType = 'username' | 'password';
interface PropTypes {
  form: LoginForm;
  onFormChanged: (form: Partial<LoginForm>) => void;
  onLogin: () => void;
}

export const LoginWithCredentials = React.memo(LoginWithCredentialsComponent);

function LoginWithCredentialsComponent({
  onLogin,
  onFormChanged,
  form,
}: PropTypes) {
  const { credentialsError: error, loading: isLoading } = useAppSelector(
    state => state.user.login,
  );

  const handleInputOnChange =
    (input: InputType) =>
    (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
      if (input === 'username') {
        onFormChanged({
          username: { ...form.username, value: e.nativeEvent.text },
        });
        return;
      }

      onFormChanged({
        password: { ...form.password, value: e.nativeEvent.text },
      });
    };

  const handleLogin = () => {
    if (isLoading) {
      return;
    }

    onLogin();
  };

  return (
    <View style={styles.container}>
      <Body>
        Utilice su correo electrónico y contraseña para administrar sus
        restaurantes.
      </Body>
      <Input
        onChange={handleInputOnChange('username')}
        onEndEditing={handleInputOnChange('username')}
        onValidateText={isValidEmail}
        value={form.username.value}
        errorMessage="El usuario ingresado no parece ser un email valido."
        placeholder={localizedStrings.login.email}
        containerStyles={styles.emailInput}
      />
      <PasswordInput
        onChange={handleInputOnChange('password')}
        onEndEditing={handleInputOnChange('password')}
        value={form.password.value}
        placeholder={localizedStrings.login.password}
      />
      <TouchableText
        containerStyles={styles.forgotPassword}
        textStyles={styles.forgotPasswordColor}
        message={localizedStrings.login.forgotPassword}
      />
      {!!error && (
        <View style={styles.serverError}>
          <Caption darkPinkColor>{error}</Caption>
        </View>
      )}
      <ColorfulButton
        isLoading={isLoading}
        title={localizedStrings.login.login}
        onPress={handleLogin}
        disabled={!form.username.value || !form.password.value}
      />
    </View>
  );
}
