import * as React from 'react';
import { View } from 'react-native';
import { ICONS } from '../../../constants';
import { localizedStrings } from '../../../localization/localized-strings';
import { Body, Caption, TransparentButton } from '../../../components/shared';
import { styles } from './styles';
import { useAppSelector } from '../../../redux/store';

interface PropTypes {
  onLogin: () => void;
}

export const LoginWithSSO = React.memo(LoginWithSSOComponent);

function LoginWithSSOComponent({ onLogin }: PropTypes) {
  const { ssoError: error, loading: isLoading } = useAppSelector(
    state => state.user.login,
  );

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Body>Inicie sesión o regístrese utilizando su cuenta de Google.</Body>
      </View>
      <View style={styles.buttonContainer}>
        {!!error && (
          <View style={styles.serverError}>
            <Caption darkPinkColor>{error}</Caption>
          </View>
        )}
        <TransparentButton
          isLoading={isLoading}
          title={localizedStrings.login.ssoLogin}
          onPress={onLogin}
          leftIcon={ICONS.google}
        />
      </View>
    </View>
  );
}
