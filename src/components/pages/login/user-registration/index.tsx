import * as React from 'react';
import { View, Text, ImageBackground, Image, Touchable } from 'react-native';
import { Input, TouchableText } from '../../../shared';
import { Body, CTAText, Title } from '../../../shared/morfando-text';
import { Button } from '../../../shared';
import { styles } from './styles';

type InputType = 'email' | 'nya' | 'password';
export function UserRegistration() {
  const [email, setUseremail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  // const [passwordrepeted, setPassword] = React.useState<string>('');
  const [nya, setNameAndSurname] = React.useState<string>('');

  const goToMain = () =>{
    //Aca le meto para irme a la pantalla anterior
    return;
  };

  const handleInputOnChange = (input: InputType) => (text: string) => {
    if (input === 'email') {
      setUseremail(text);
      return;
    }
    else{
      if(input='nya')
      {
        setNameAndSurname(text);
      }
    }
    setPassword(text);
  };

  return (
      <ImageBackground source={require('../../../../assets/images/background.png')} resizeMode="center" style={styles.image}>
        <View style={styles.title}>
          <Title>Registro de usuario</Title>
          <Body center style={styles.text}>Registrese en Morfando Inc y administre sus restaurantes de forma fácil y rápida.</Body>
        </View>
        <View style={{flex:3}}>
          <View style={[styles.loginBox,styles.elevation,]}>
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
          <Button title="Registrarse"/>
          <View>
            <TouchableText message='Cancelar' type='ctatext' containerStyles={styles.cancelcta}></TouchableText>
          </View>
        </View>
      </ImageBackground>

  );
}