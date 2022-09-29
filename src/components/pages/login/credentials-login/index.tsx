import * as React from 'react';
import { View } from 'react-native';
import { Button, Input, TouchableText } from '../../../shared';
import { styles } from './styles';
import { Body } from '../../../shared/morfando-text';

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
    <View>
      <Body>
        Utilice su correo electrónico y contraseña para administrar sus
        restaurantes.
      </Body>
      <Input
        onChangeText={handleInputOnChange('username')}
        containerStyles={styles.emailInput}
        value={username}
        placeholder="Email"
      />
      <Input
        onChangeText={handleInputOnChange('password')}
        value={password}
        placeholder="Contraseña"
      />
      <TouchableText
        containerStyles={styles.forgotPassword}
        textColorStyle={styles.forgotPasswordColor}
        message="¿Olvidaste tu contraseña?"
      />
      <Button title="Ingresar" onPress={onLogin} />
    </View>
  );
}
