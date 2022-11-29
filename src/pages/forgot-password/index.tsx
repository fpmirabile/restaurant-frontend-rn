import * as React from 'react';
import { ImageBackground, View } from 'react-native';
import {
  Body,
  Caption,
  ColorfulButton,
  Input,
  PasswordInput,
  Title,
  TouchableText,
} from '../../components/shared';
import { useAppNavigation } from '../../hook/navigation';
import { actions } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  equalsTo,
  isValidEmail,
  isValidPassword,
  notEmpty,
} from '../../util/validation';
import { styles } from './styles';

export function ForgotPassword() {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const { loading: isLoading, error } = useAppSelector(
    state => state.user.forgotPassword,
  );
  const [newPassword, setNewPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [emailSent, setEmailSent] = React.useState(false);
  const [showPasswordChange, setPasswordChange] = React.useState(false);
  const [code, setCode] = React.useState('');

  const handleInputChange = React.useCallback(
    (field: 'email' | 'code' | 'password' | 'repeatPassword') =>
      (value: string) => {
        if (field === 'email') {
          setEmail(value);
        } else if (field === 'code') {
          setCode(value);
        } else if (field === 'password') {
          setNewPassword(value);
        } else {
          setRepeatPassword(value);
        }
      },
    [],
  );

  const handleChangePassword = React.useCallback(() => {
    dispatch(actions.userActions.changePassword(newPassword));
  }, [dispatch, newPassword]);

  const handleEmailSend = React.useCallback(() => {
    if (!emailSent) {
      if (isValidEmail(email)) {
        setEmailSent(true);
      }

      return;
    }

    if (notEmpty(code)) {
      setPasswordChange(true);
    }
  }, [code, email, emailSent]);

  const goBack = React.useCallback(() => {
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      resizeMode="center"
      style={styles.imageBackground}>
      <View style={styles.titleContainer}>
        <Title>Recuperar contraseña</Title>
      </View>
      <View style={styles.whiteBoxContainer}>
        <View style={styles.whiteBox}>
          <Body style={styles.description} center>
            Ingrese su email y luego el código recibido por email para cambiar
            su contraseña.
          </Body>
          <View style={styles.formContainer}>
            {showPasswordChange && (
              <>
                <PasswordInput
                  onChangeText={handleInputChange('password')}
                  onValidateText={isValidPassword}
                  containerStyles={styles.emailInput}
                  value={newPassword}
                  placeholder="Nueva Password"
                  errorMessage="La contraseña no cumple con nuestras normas (al menos 1 mayuscula, 1 miniscula, 1 simbolo, 1 numero y 6 caracteres"
                />
                <PasswordInput
                  onChangeText={handleInputChange('repeatPassword')}
                  onValidateText={equalsTo(newPassword)}
                  containerStyles={styles.emailInput}
                  value={repeatPassword}
                  placeholder="Repite la nueva password"
                  errorMessage="Las password no coinciden."
                />
              </>
            )}
            {!showPasswordChange && (
              <>
                <Input
                  onChangeText={handleInputChange('email')}
                  onValidateText={isValidEmail}
                  containerStyles={styles.emailInput}
                  value={email}
                  placeholder="Email"
                  errorMessage="El email ingresado no es correcto."
                />
                {emailSent && (
                  <Input
                    onChangeText={handleInputChange('code')}
                    onValidateText={notEmpty}
                    containerStyles={styles.emailInput}
                    value={code}
                    placeholder="Código de verificación"
                    errorMessage="El código ingresado no parece ser válido."
                  />
                )}
              </>
            )}
            {!!error && <Caption darkPinkColor>{error}</Caption>}
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <ColorfulButton
          isLoading={isLoading}
          onPress={!showPasswordChange ? handleEmailSend : handleChangePassword}
          title={
            !emailSent
              ? 'Enviar Email'
              : showPasswordChange
              ? 'Cambiar Contraseña'
              : 'Enviar código'
          }
        />
        <View>
          <TouchableText
            message="Volver"
            type="ctaText"
            containerStyles={styles.cancelCta}
            onPress={goBack}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
