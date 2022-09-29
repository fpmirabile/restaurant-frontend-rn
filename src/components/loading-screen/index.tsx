import * as React from 'react';
import { ImageBackground } from 'react-native';
import { styles } from './styles';

export function LoadingScreen() {
  return (
    <ImageBackground
      source={require('../../assets/images/splash/splash.png')}
      style={styles.splash}
    />
  );
}
