import * as React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import { Caption, Headline6, Input } from '../../../../components/shared';
import { localizedStrings } from '../../../../localization/localized-strings';
import { actions } from '../../../../redux';
import { StepOneFields } from '../../../../redux/reducers/restaurant/slice';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { styles } from './styles';

interface PropTypes {}

export function CreateRestaurantStepOne({}: PropTypes) {
  const {
    lat,
    lon,
    locality,
    name,
    neighborhood,
    state,
    street,
    streetNumber,
  } = useAppSelector(rState => rState.restaurant.create.stepOne);
  const dispatch = useAppDispatch();

  const handleChangeValue = React.useCallback(
    (field: keyof StepOneFields) => (value: any) => {
      console.log('test', value, value[field]);
      dispatch(
        actions.restaurants.onUpdateStepOne({
          lat,
          lon,
          locality,
          name,
          neighborhood,
          state,
          street,
          streetNumber,
          [field]: value,
        }),
      );
    },
    [
      dispatch,
      lat,
      lon,
      locality,
      neighborhood,
      state,
      street,
      streetNumber,
      name,
    ],
  );

  return (
    <View>
      <Headline6>{localizedStrings.restaurant.create.direction}</Headline6>
      <View style={styles.inputContainer}>
        <Input
          onChangeText={handleChangeValue('name')}
          containerStyles={styles.input}
          value={name}
          placeholder={localizedStrings.restaurant.create.restaurantName}
        />
        <View style={styles.doubleInputContainer}>
          <Input
            onChangeText={handleChangeValue('street')}
            containerStyles={[styles.input, styles.smallInput]}
            value={street}
            placeholder={localizedStrings.restaurant.create.street}
          />
          <View style={styles.separator} />
          <Input
            keyboardType="numeric"
            onChangeText={handleChangeValue('streetNumber')}
            containerStyles={[styles.input, styles.smallInput]}
            value={streetNumber}
            placeholder={localizedStrings.restaurant.create.streetNumber}
          />
        </View>
        <Input
          onChangeText={handleChangeValue('neighborhood')}
          containerStyles={styles.input}
          value={neighborhood}
          placeholder={localizedStrings.restaurant.create.neighborhood}
        />
        <Input
          onChangeText={handleChangeValue('locality')}
          containerStyles={styles.input}
          value={locality}
          placeholder={localizedStrings.restaurant.create.town}
        />
        <Input
          onChangeText={handleChangeValue('state')}
          containerStyles={styles.input}
          value={state}
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
