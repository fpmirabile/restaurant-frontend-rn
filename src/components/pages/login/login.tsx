import * as React from 'react';
import { View, ImageBackground } from 'react-native';
import { TouchableText } from '../../shared';
import { LoginWithCredentials } from './credentials-login';
import { RegistroTandC } from './footer-registro';
import { LoginWithSSO } from './sso-login';
import { styles } from './styles';
import {Body, Body2, Caption, Title} from '../../shared/morfando-text';


interface PropTypes {}

type Tab = 'client' | 'restaurant';

export function Login({}: PropTypes) {
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

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/images/background.png')} resizeMode="center" style={styles.image}>
        <View style={[styles.loginBox,styles.elevation]}>
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
            {selectedTab === 'restaurant' && <LoginWithCredentials/>}
          </View>
        </View>
        {selectedTab==='restaurant' &&<RegistroTandC/>}
      </ImageBackground>
    </View>
  );
}
