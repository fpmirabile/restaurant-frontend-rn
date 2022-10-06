import * as React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { TouchableText, Body2, Caption } from '../../../shared';

interface PropTypes {
  onRegistration: () => void;
  showRegisterButton: boolean;
}

export const RegisterFooter = React.memo(RegisterFooterComponent);

function RegisterFooterComponent({
  onRegistration,
  showRegisterButton,
}: PropTypes) {
  return (
    <View>
      {showRegisterButton && (
        <View style={styles.registerContainer}>
          <Body2>¿No tenes cuenta? </Body2>
          <TouchableText
            type="body2DarkPink"
            message="Registrate"
            onPress={onRegistration}
          />
        </View>
      )}
      <View style={styles.tandc}>
        <Caption>* Al registrarse, usted acepta nuestros</Caption>
        <TouchableText
          type="captionDarkPink"
          message="Términos y condiciones"
        />
      </View>
    </View>
  );
}
