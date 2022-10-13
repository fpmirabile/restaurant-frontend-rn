import * as React from 'react';
import { View } from 'react-native';
import { Button, Input, TouchableText } from '../../../shared';
import { styles } from './styles';
import { Body } from '../../../shared/morfando-text';
import { localizedStrings } from '../../../../localization/localized-strings';

type InputType = 'username' | 'password';
interface PropTypes {
  onLogin: () => void;
}

export const LoginWithCredentials = React.memo(LoginWithCredentialsComponent);

function LoginWithCredentialsComponent({ onLogin }: PropTypes) {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const handleInputOnChange = (input: InputType) => (text: string) => {
    if (input === 'username') {
      setUsername(text);
      return;
    }

    setPassword(text);
  };

  return (
    <View style={styles.container}>
      <Body>
        Utilice su correo electrónico y contraseña para administrar sus
        restaurantes.
      </Body>
      <Input
        onChangeText={handleInputOnChange('username')}
        value={username}
        placeholder={localizedStrings.login.email}
        containerStyles={styles.emailInput}
      />
      <Input
        onChangeText={handleInputOnChange('password')}
        value={password}
        placeholder={localizedStrings.login.password}
      />
      <TouchableText
        containerStyles={styles.forgotPassword}
        textStyles={styles.forgotPasswordColor}
        message={localizedStrings.login.forgotPassword}
      />
      <Button title={localizedStrings.login.login} onPress={onLogin} />
    </View>
  );
}
