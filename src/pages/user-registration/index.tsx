import * as React from 'react';
import { View, ImageBackground } from 'react-native';
import {
  Input,
  TouchableText,
  Body,
  Title,
  Caption,
  PasswordInput,
} from '../../components/shared';
import { ColorfulButton } from '../../components/shared';
import { MorfandoRouterParams } from '../../navigation/navigation';
import { actions } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  equalsTo,
  isValidEmail,
  isValidPassword,
  notEmpty,
} from '../../util/validation';
import { styles } from './styles';

type FormField = {
  value: string;
};

const initialField: FormField = {
  value: '',
};

export type RegistrationForm = {
  email: FormField;
  name: FormField;
  password: FormField;
  repeatPassword: FormField;
};

interface RouterProps extends MorfandoRouterParams<'Registration'> {}

export function UserRegistration({ navigation }: RouterProps) {
  const dispatch = useAppDispatch();
  const { error, loading: isLoading } = useAppSelector(
    state => state.user.registration,
  );
  const [form, setFormValues] = React.useState<RegistrationForm>({
    email: initialField,
    name: initialField,
    password: initialField,
    repeatPassword: initialField,
  });

  const goToMain = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleInputOnChange =
    (field: keyof RegistrationForm) => (newText: string) => {
      setFormValues({
        ...form,
        [field]: {
          value: newText,
        },
      });
    };

  const isAnyFieldEmpty = Object.values(form).some(i => !i.value);
  const handleRegistrationPress = () => {
    if (isAnyFieldEmpty) {
      return;
    } else {
      if (isLoading) {
        return;
      }

      dispatch(actions.userActions.registerOwner(form));
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      resizeMode="center"
      style={styles.image}>
      <View style={styles.title}>
        <Title>Registro de usuario</Title>
        <Body center style={styles.text}>
          Registrese en Morfando Inc y administre sus restaurantes de forma
          fácil y rápida.
        </Body>
      </View>
      <View style={styles.whiteBoxContainer}>
        <View style={[styles.whiteBox, styles.elevation]}>
          <View style={styles.selectedLoginContent}>
            <Input
              onChangeText={handleInputOnChange('email')}
              onValidateText={isValidEmail}
              containerStyles={styles.emailInput}
              value={form.email.value}
              placeholder="Email"
              errorMessage="El email ingresado no es correcto."
            />
            <Input
              onChangeText={handleInputOnChange('name')}
              onValidateText={notEmpty}
              containerStyles={styles.emailInput}
              value={form.name.value}
              placeholder="Nombre y apellido"
              errorMessage="El nombre ingresado no es correcto."
            />
            <PasswordInput
              onChangeText={handleInputOnChange('password')}
              onValidateText={isValidPassword}
              containerStyles={styles.emailInput}
              value={form.password.value}
              placeholder="Contraseña"
              errorMessage="La contraseña no cumple con nuestras normas (al menos 1 mayuscula, 1 miniscula, 1 simbolo, 1 numero y 6 caracteres"
              secureTextEntry
            />
            <PasswordInput
              onChangeText={handleInputOnChange('repeatPassword')}
              onValidateText={equalsTo(form.password.value)}
              containerStyles={styles.emailInput}
              value={form.repeatPassword.value}
              placeholder="Repita contraseña"
              errorMessage="Las passwords no coinciden."
            />
            {!!error && <Caption darkPinkColor>{error}</Caption>}
          </View>
        </View>
      </View>
      <View style={styles.button}>
        <ColorfulButton
          isLoading={isLoading}
          onPress={handleRegistrationPress}
          title="Registrarse"
          disabled={isAnyFieldEmpty}
        />
        <View>
          <TouchableText
            message="Cancelar"
            type="ctaText"
            containerStyles={styles.cancelCta}
            onPress={goToMain}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
