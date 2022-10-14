import * as React from 'react';
import { View, ImageBackground } from 'react-native';
import { Input, TouchableText } from '../../components/shared';
import { Body, Title } from '../../components/shared/morfando-text';
import { Button } from '../../components/shared';
import { MorfandoRouterParams } from '../../navigation/navigation';
import { styles } from './styles';

type InputType = 'email' | 'nya' | 'password';
interface RouterProps extends MorfandoRouterParams<'Registration'> {}

export function UserRegistration({ navigation }: RouterProps) {
  const [email, setUserEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [nya, setNameAndSurname] = React.useState<string>('');

  const goToMain = () => {
    navigation.goBack();
  };

  const handleInputOnChange = (input: InputType) => (text: string) => {
    if (input === 'email') {
      setUserEmail(text);
      return;
    } else {
      if ((input = 'nya')) {
        setNameAndSurname(text);
      }
    }
    setPassword(text);
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/background.png')}
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
              containerStyles={styles.emailInput}
              value={email}
              placeholder="Email"
            />
            <Input
              onChangeText={handleInputOnChange('nya')}
              containerStyles={styles.emailInput}
              value={nya}
              placeholder="Nombre y apellido"
            />
            <Input
              onChangeText={handleInputOnChange('password')}
              containerStyles={styles.emailInput}
              value={password}
              placeholder="Contraseña"
            />
            <Input
              onChangeText={handleInputOnChange('email')}
              containerStyles={styles.emailInput}
              value={email}
              placeholder="Repita contraseña"
            />
          </View>
        </View>
      </View>
      <View style={styles.button}>
        <Button title="Registrarse" />
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
