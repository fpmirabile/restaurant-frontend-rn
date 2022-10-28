import * as React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import { Caption, Headline6, Input } from '../../../../components/shared';
import { localizedStrings } from '../../../../localization/localized-strings';
import { styles } from './styles';

interface PropTypes {}

export function CreateRestaurantStepOne({}: PropTypes) {
  const [name] = React.useState<string>('');
  const [streetName] = React.useState<string>('');
  const [streetNumber] = React.useState<string>('');
  const [neighboard] = React.useState<string>('');
  const [locality] = React.useState<string>('');
  const [province] = React.useState<string>('');

  return (
    <View>
      <Headline6>{localizedStrings.restaurant.create.direction}</Headline6>
      <View style={styles.inputContainer}>
        <Input
          containerStyles={styles.input}
          value={name}
          placeholder={localizedStrings.restaurant.create.restaurantName}
        />
        <View style={styles.doubleInputContainer}>
          <Input
            containerStyles={[styles.input, styles.smallInput]}
            value={streetName}
            placeholder={localizedStrings.restaurant.create.street}
          />
          <View style={styles.separator} />
          <Input
            containerStyles={[styles.input, styles.smallInput]}
            value={streetNumber}
            placeholder={localizedStrings.restaurant.create.streetNumber}
          />
        </View>
        <Input
          containerStyles={styles.input}
          value={neighboard}
          placeholder={localizedStrings.restaurant.create.neighboard}
        />
        <Input
          containerStyles={styles.input}
          value={locality}
          placeholder={localizedStrings.restaurant.create.town}
        />
        <Input
          containerStyles={styles.input}
          value={province}
          placeholder={localizedStrings.restaurant.create.state}
        />
      </View>
      <View style={styles.mapTitleContainer}>
        <Headline6 style={styles.mapTitle}>
          {localizedStrings.restaurant.create.geolocalization}
        </Headline6>
        <Caption>
          {localizedStrings.restaurant.create.localizationSubtitle}
        </Caption>
      </View>
      <MapView
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        style={styles.map}
      />
    </View>
  );
}
