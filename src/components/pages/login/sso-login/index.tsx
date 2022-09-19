import * as React from 'react';
import { View, Text } from 'react-native';
import { Button } from '../../../shared';
import { styles } from './styles';
import { AppText } from '../../../shared/text-styles/appText';

export function LoginWithSSO() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <AppText.Body>Inicie sesión o regístrese utilizando su cuenta de Google.</AppText.Body>
      </View>
      <Button title="Inicia sesion con Google" />
    </View>
  );
}
