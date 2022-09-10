import * as React from 'react';
import { View } from 'react-native';
import { Title, TouchableText } from '../../shared';
import { LoginWithCredentials } from './credentials-login';
import { LoginWithSSO } from './sso-login';
import { styles } from './styles';

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
      <View style={styles.loginBox}>
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
          <Title containerStyles={styles.loginTitle} title="Login" />
          {selectedTab === 'client' && <LoginWithSSO />}
          {selectedTab === 'restaurant' && <LoginWithCredentials />}
        </View>
      </View>
    </View>
  );
}
