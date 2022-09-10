import * as React from 'react';
import { View, Text } from 'react-native';
import { Button } from '../../../shared';

export function LoginWithSSO() {
  return (
    <View>
      <Text>Inicie sesión o regístrese utilizando su cuenta de Google.</Text>
      <Button title="Inicia sesion con Google" />
    </View>
  );
}
