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
import { localizedStrings } from '../../../localization/localized-strings';

interface PropTypes extends MorfandoRouterParams<'Login'> {}
type Tab = 'client' | 'restaurant';

export function Login({ navigation }: PropTypes) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [selectedTab, setSelectedTab] = React.useState<Tab>('client');
  const clientStyles = [
    styles.tabTextContainer,
    selectedTab === 'client' ? {} : styles.notSelectedTab,
  ];
  const restaurantStyles = [
    styles.tabTextContainer,
    selectedTab === 'restaurant' ? {} : styles.notSelectedTab,
  ];

  const handleTabPress = (tab: Tab) => () => {
    setSelectedTab(tab);
  };

  const goToRegistration = () => {
    navigation.push('Registration');
  };

  const onCredentialsLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(
        general.actions.login({ username: 'sarasa', password: 'sarasa' }),
      );
    }, 1000);
    // TODO: Validation + Endpoint awaiting + checking responses
    // navigation.push("Home");
  };

  const onSSOLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(
        general.actions.login({ username: 'sarasa', password: 'sarasa' }),
      );
    }, 1000);

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
          <Title>{localizedStrings.appName}</Title>
        </View>
        <View style={styles.topSideContainer}>
          <View
            style={[
              styles.loginBox,
              selectedTab === 'restaurant' ? styles.loginBoxFlex : {},
            ]}>
            <View style={styles.tabs}>
              <View style={styles.tab}>
                <TouchableText
                  onPress={handleTabPress('client')}
                  message={localizedStrings.login.iAmClient}
                  containerStyles={clientStyles}
                />
              </View>
              <View style={styles.tab}>
                <TouchableText
                  onPress={handleTabPress('restaurant')}
                  message={localizedStrings.login.iAmOwner}
                  containerStyles={restaurantStyles}
                />
              </View>
            </View>
            <View style={styles.selectedLoginContent}>
              <Title style={styles.loginTitle}>Login</Title>
              {selectedTab === 'client' && (
                <LoginWithSSO isLoading={isLoading} onLogin={onSSOLogin} />
              )}
              {selectedTab === 'restaurant' && (
                <LoginWithCredentials
                  isLoading={isLoading}
                  onLogin={onCredentialsLogin}
                />
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
