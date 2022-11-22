import * as React from 'react';
import { View, ImageBackground } from 'react-native';
import { TouchableText, Title } from '../../components/shared';
import { LoginWithCredentials } from './credentials-login';
import { RegisterFooter } from './footer-registro';
import { LoginWithSSO } from './sso-login';
import { MorfandoRouterParams } from '../../navigation/navigation';
import { useAppDispatch } from '../../redux/store';
import { actions } from '../../redux';
import { styles } from './styles';
import { localizedStrings } from '../../localization/localized-strings';

export type LoginForm = {
  username: {
    value: string;
  };
  password: {
    value: string;
  };
};
interface PropTypes extends MorfandoRouterParams<'Login'> {}
type Tab = 'client' | 'restaurant';

export function Login({ navigation }: PropTypes) {
  const dispatch = useAppDispatch();
  const [selectedTab, setSelectedTab] = React.useState<Tab>('client');
  const [loginForm, setLoginForm] = React.useState<LoginForm>({
    username: {
      value: '',
    },
    password: {
      value: '',
    },
  });
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
    dispatch(
      actions.userActions.loginWithCredentials({
        username: loginForm.username.value,
        password: loginForm.password.value,
      }),
    );
  };

  const onSSOLogin = () => {
    dispatch(actions.userActions.googleSignIn());
  };

  const handleUserCredentialsChanged = (field: Partial<LoginForm>) => {
    setLoginForm({
      ...loginForm,
      ...field,
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/background.png')}
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
                <LoginWithSSO onLogin={onSSOLogin} />
              )}
              {selectedTab === 'restaurant' && (
                <LoginWithCredentials
                  onLogin={onCredentialsLogin}
                  onFormChanged={handleUserCredentialsChanged}
                  form={loginForm}
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
