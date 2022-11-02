import * as React from 'react';
import {
  View,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from 'react-native';
import {
  ColorfulButton,
  Input,
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

  const handleInputBlur = (field: InputType) => () => {
    switch (field) {
      case 'username':
        onFormChanged({
          ...form,
          username: {
            ...form.username,
            error: !isValidEmail(form.username.value),
          },
        });
        break;
      case 'password':
        break;
    }
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
        onBlur={handleInputBlur('username')}
        value={form.username.value}
        hasError={form.username.error}
        errorMessage="El usuario ingresado no parece ser un email valido."
        placeholder={localizedStrings.login.email}
        containerStyles={styles.emailInput}
      />
      <Input
        onChange={handleInputOnChange('password')}
        onEndEditing={handleInputOnChange('password')}
        onBlur={handleInputBlur('password')}
        value={form.password.value}
        hasError={form.password.error}
        errorMessage="La contraseña no es correcta."
        placeholder={localizedStrings.login.password}
        secureTextEntry
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
      />
    </View>
  );
}
