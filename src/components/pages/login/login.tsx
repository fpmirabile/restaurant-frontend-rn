import * as React from 'react';
import { View, ImageBackground } from 'react-native';
import { TouchableText } from '../../shared';
import { LoginWithCredentials } from './credentials-login';
import { RegisterFooter } from './footer-registro';
import { LoginWithSSO } from './sso-login';
import { styles } from './styles';
import { Title } from '../../shared/morfando-text';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/navigation';

type PropTypes = NativeStackScreenProps<RootStackParamList, 'Login'>;
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
              {selectedTab === 'client' && <LoginWithSSO />}
              {selectedTab === 'restaurant' && <LoginWithCredentials />}
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {selectedTab === 'restaurant' && (
            <RegisterFooter onRegistration={goToRegistration} />
          )}
        </View>
      </ImageBackground>
    </View>
  );
}
