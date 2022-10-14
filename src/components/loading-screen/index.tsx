import * as React from 'react';
import { ImageBackground } from 'react-native';
import { actions } from '../../redux';
import { useAppDispatch } from '../../redux/store';
import { styles } from './styles';

export function LoadingScreen() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(actions.userActions.initialLoading());
  }, [dispatch]);

  return (
    <ImageBackground
      source={require('../../assets/images/splash/splash.png')}
      style={styles.splash}
    />
  );
}
