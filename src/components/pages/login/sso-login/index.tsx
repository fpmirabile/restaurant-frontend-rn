import * as React from 'react';
import { View, Text } from 'react-native';
import { Button } from '../../../shared';
import { styles } from './styles';

export function LoginWithSSO() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text>Inicie sesión o regístrese utilizando su cuenta de Google.</Text>
      </View>
      <Button title="Inicia sesion con Google" />
    </View>
  );
}
