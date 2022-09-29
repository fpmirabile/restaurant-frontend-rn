import * as React from 'react';
import { ImageBackground } from 'react-native';
import { general } from '../../redux';
import { useAppDispatch } from '../../redux/store';
import { styles } from './styles';

export function LoadingScreen() {
  const dispatcher = useAppDispatch();
  dispatcher(general.actions.initialLoading());
  return (
    <ImageBackground
      source={require('../../assets/images/splash/splash.png')}
      style={styles.splash}
    />
  );
}
