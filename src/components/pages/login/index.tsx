import * as React from 'react';
import { View, ImageBackground } from 'react-native';
import { TouchableText, Title } from '../../shared';
import { LoginWithCredentials } from './credentials-login';
import { RegisterFooter } from './footer-registro';
import { LoginWithSSO } from './sso-login';
import { MorfandoRouterParams } from '../../../navigation/navigation';
import { useAppDispatch } from '../../../redux/store';
import { general } from '../../../redux';
import { styles } from './styles';

interface PropTypes extends MorfandoRouterParams<'Login'> {}
type Tab = 'client' | 'restaurant';

export function Login({ navigation }: PropTypes) {
  const dispatcher = useAppDispatch();
  const [selectedTab, setSelectedTab] = React.useState<Tab>('client');
  const clientStyles = [
    styles.tab,
    selectedTab === 'client' ? {} : styles.notSelectedTab,
  ];
  const restaurantStyles = [
    styles.tab,
    selectedTab === 'restaurant' ? {} : styles.notSelectedTab,
  ];

  const handleTabPress = (tab: Tab) => () => {
    setSelectedTab(tab);
  };

  const goToRegistration = () => {
    navigation.push('Registration');
  };

  const onCredentialsLogin = () => {
    dispatcher(
      general.actions.login({ username: 'sarasa', password: 'sarasa' }),
    );
    // TODO: Validation + Endpoint awaiting + checking responses
    // navigation.push("Home");
  };

  const onSSOLogin = () => {
    dispatcher(
      general.actions.login({ username: 'sarasa', password: 'sarasa' }),
    );
    // TODO: Validation + Endpoint awaiting + checking responses
    // navigation.push("Home");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        resizeMode="center"
        style={styles.imageBackground}>
        <View style={styles.title}>
          <Title>Morfando Inc</Title>
        </View>
        <View style={styles.topSideContainer}>
          <View
            style={[
              styles.loginBox,
              selectedTab === 'restaurant' ? styles.loginBoxFlex : {},
            ]}>
            <View style={styles.tabs}>
              <View style={{ flex: 1 }}>
                <TouchableText
                  onPress={handleTabPress('client')}
                  message="Soy cliente"
                  containerStyles={clientStyles}
                />
              </View>
              <View style={{ flex: 1 }}>
                <TouchableText
                  onPress={handleTabPress('restaurant')}
                  message="Soy dueño de restaurante"
                  containerStyles={restaurantStyles}
                />
              </View>
            </View>
            <View style={styles.selectedLoginContent}>
              <Title style={styles.loginTitle}>Login</Title>
              {selectedTab === 'client' && (
                <LoginWithSSO onLogin={onSSOLogin} />
              )}
              {selectedTab === 'restaurant' && (
                <LoginWithCredentials onLogin={onCredentialsLogin} />
              )}
            </View>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <RegisterFooter
            onRegistration={goToRegistration}
            showRegisterButton={selectedTab === 'restaurant'}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
