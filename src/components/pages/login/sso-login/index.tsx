import * as React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { Body } from '../../../shared/morfando-text';
import { Button } from '../../../shared';

interface PropTypes {
  onLogin: () => void;
}

export const LoginWithSSO = React.memo(LoginWithSSOComponent);

function LoginWithSSOComponent({ onLogin }: PropTypes) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Body>Inicie sesión o regístrese utilizando su cuenta de Google.</Body>
      </View>
      <Button title="Inicia sesion con Google" onPress={onLogin} />
    </View>
  );
}
