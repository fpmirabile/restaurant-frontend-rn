import * as React from 'react';
import { ImageBackground } from 'react-native';
import { general } from '../../redux';
import { useAppDispatch } from '../../redux/store';
import { styles } from './styles';

export function LoadingScreen() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(general.actions.initialLoading());
  }, [dispatch]);

  return (
    <ImageBackground
      source={require('../../assets/images/splash/splash.png')}
      style={styles.splash}
    />
  );
}
