import * as React from 'react';
import { View } from 'react-native';
import { localizedStrings } from '../../../../localization/localized-strings';
import { Button, Body } from '../../../shared';
import { styles } from './styles';

interface PropTypes {
  onLogin: () => void;
  isLoading: boolean;
}

export const LoginWithSSO = React.memo(LoginWithSSOComponent);

function LoginWithSSOComponent({ isLoading, onLogin }: PropTypes) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Body>Inicie sesión o regístrese utilizando su cuenta de Google.</Body>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          isLoading={isLoading}
          title={localizedStrings.login.ssoLogin}
          onPress={onLogin}
        />
      </View>
    </View>
  );
}
