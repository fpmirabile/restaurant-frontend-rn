import * as React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { Body } from '../../../shared/morfando-text';
import { Button } from '../../../shared';

export function LoginWithSSO() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Body>Inicie sesión o regístrese utilizando su cuenta de Google.</Body>
      </View>
      <Button title="Inicia sesion con Google" />
    </View>
  );
}
