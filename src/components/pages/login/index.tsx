import * as React from 'react';
import { View, ImageBackground } from 'react-native';
import { TouchableText } from '../../shared';
import { LoginWithCredentials } from './credentials-login';
import { RegisterFooter } from './footer-registro';
import { LoginWithSSO } from './sso-login';
import { styles } from './styles';
import { Title } from '../../shared/morfando-text';
import { MorfandoRouterParams } from '../../../navigation/navigation';

interface PropTypes extends MorfandoRouterParams<'Login'> {}
type Tab = 'client' | 'restaurant';

export function Login({ navigation }: PropTypes) {
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
    // TODO: Validation + Endpoint awaiting + checking responses
    navigation.push("Home");
  }

  const onSSOLogin = () => {
    // TODO: Validation + Endpoint awaiting + checking responses
    navigation.push("Home");
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        resizeMode="center"
        style={styles.image}>
        <View style={styles.title}>
          <Title>Morfando Inc</Title>
        </View>
        <View style={{ flex: 6 }}>
          <View style={[styles.loginBox, styles.elevation]}>
            <View style={styles.tabs}>
              <View style={clientStyles}>
                <TouchableText
                  onPress={handleTabPress('client')}
                  message="Soy cliente"
                />
              </View>
              <View style={restaurantStyles}>
                <TouchableText
                  onPress={handleTabPress('restaurant')}
                  message="Soy dueño de restaurante"
                />
              </View>
            </View>
            <View style={styles.selectedLoginContent}>
              <Title style={styles.loginTitle}>Login</Title>
              {selectedTab === 'client' && <LoginWithSSO onLogin={onSSOLogin} />}
              {selectedTab === 'restaurant' && <LoginWithCredentials onLogin={onCredentialsLogin} />}
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <RegisterFooter
            onRegistration={goToRegistration}
            showRegisterButton={selectedTab === 'restaurant'}
          />
        </View>
      </ImageBackground>
    </View>
  );
}