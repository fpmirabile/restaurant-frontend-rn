import * as React from 'react';
import { View, ImageBackground } from 'react-native';
import { Title, TouchableText } from '../../components/shared';
import { MorfandoRouterParams } from '../../navigation/navigation';
import ChefImage from '../../assets/images/chef.svg';
import { styles } from './styles';

interface RouterProps extends MorfandoRouterParams<'SuccessRegistration'> {}

export function SuccessRegistration({ navigation }: RouterProps) {
  const goToHome = () => {
    navigation.push('Home');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      resizeMode="center"
      style={styles.image}>
      <View style={styles.title}>
        <Title>Ya estas registrado</Title>
      </View>
      <View style={styles.imageContainer}>
        <ChefImage width={308} height={326} />
      </View>
      <View style={styles.button}>
        <View>
          <TouchableText
            message="Aceptar"
            type="ctaText"
            containerStyles={styles.acceptCta}
            onPress={goToHome}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
