import * as React from 'react';
import {
  View,
  ImageBackground,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from 'react-native';
import {
  Input,
  TouchableText,
  Body,
  Title,
  Caption,
} from '../../components/shared';
import { ColorfulButton } from '../../components/shared';
import { MorfandoRouterParams } from '../../navigation/navigation';
import { actions } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { isValidEmail, isValidPassword } from '../../util/validation';
import { styles } from './styles';

type FormField = {
  value: string;
  error: boolean;
};

const initialField: FormField = {
  value: '',
  error: false,
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
    (field: keyof RegistrationForm) =>
    (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
      setFormValues({
        ...form,
        [field]: {
          ...form[field],
          value: e.nativeEvent.text,
        },
      });
    };

  const handleRegistrationPress = () => {
    let fieldValues = Object.values(form);
    if (fieldValues.some(i => i.error)) {
      const emptyFields = Object.keys(form).filter((field: string) => {
        return !form[field as keyof RegistrationForm].value;
      });

      const copyForm = { ...form };
      emptyFields.forEach((field: string) => {
        copyForm[field as keyof RegistrationForm].error = true;
      });

      setFormValues(copyForm);
    } else {
      dispatch(actions.userActions.registerOwner(form));
    }
  };

  const onBlurInput = (field: keyof RegistrationForm) => () => {
    switch (field) {
      case 'email':
        setFormValues({
          ...form,
          email: { ...form.email, error: !isValidEmail(form.email.value) },
        });
        break;
      case 'password':
        setFormValues({
          ...form,
          password: {
            ...form.password,
            error: !isValidPassword(form.password.value),
          },
        });
        break;
      case 'name':
        setFormValues({
          ...form,
          name: {
            ...form.name,
            error: !form.name.value,
          },
        });
        break;
      case 'repeatPassword':
        setFormValues({
          ...form,
          repeatPassword: {
            ...form.repeatPassword,
            error: form.password.value !== form.repeatPassword.value,
          },
        });
        break;
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
              onChange={handleInputOnChange('email')}
              onEndEditing={handleInputOnChange('email')}
              containerStyles={styles.emailInput}
              value={form.email.value}
              placeholder="Email"
              hasError={form.email.error}
              errorMessage="El email ingresado no es correcto."
              onBlur={onBlurInput('email')}
            />
            <Input
              onChange={handleInputOnChange('name')}
              onEndEditing={handleInputOnChange('name')}
              containerStyles={styles.emailInput}
              value={form.name.value}
              placeholder="Nombre y apellido"
              hasError={form.name.error}
              errorMessage="El nombre ingresado no es correcto."
              onBlur={onBlurInput('name')}
            />
            <Input
              onChange={handleInputOnChange('password')}
              onEndEditing={handleInputOnChange('password')}
              containerStyles={styles.emailInput}
              value={form.password.value}
              placeholder="Contraseña"
              errorMessage="La password ingresada no es correcta."
              hasError={form.password.error}
              onBlur={onBlurInput('password')}
              secureTextEntry
            />
            <Input
              onChange={handleInputOnChange('repeatPassword')}
              onEndEditing={handleInputOnChange('repeatPassword')}
              containerStyles={styles.emailInput}
              value={form.repeatPassword.value}
              placeholder="Repita contraseña"
              errorMessage="Las passwords no coinciden."
              hasError={form.repeatPassword.error}
              onBlur={onBlurInput('repeatPassword')}
              secureTextEntry
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
