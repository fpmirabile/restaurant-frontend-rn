import * as React from 'react';
import { View, Text } from 'react-native';
import { TouchableText } from '../../../shared';
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
