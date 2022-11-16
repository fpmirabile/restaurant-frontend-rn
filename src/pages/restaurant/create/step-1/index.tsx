import * as React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {
  // Caption,
  Headline6,
  Input,
  Dropdown,
} from '../../../../components/shared';
import { localizedStrings } from '../../../../localization/localized-strings';
import { actions, StepOneFields } from '../../../../redux';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { atLeastOneSelected, notEmpty } from '../../../../util/validation';
import { styles } from './styles';

const initialPositionForMap = {
  latitude: -34.603722,
  longitude: -58.381592,
  latitudeDelta: 0.0022,
  longitudeDelta: 0.0022,
};

interface PropTypes {}
export function CreateRestaurantStepOne({}: PropTypes) {
  const map = React.createRef<MapView>();
  const stepOne = useAppSelector(rState => rState.restaurant.create.stepOne);
  const dispatch = useAppDispatch();

  const localities = [
    { key: '1', value: 'Quilmes' },
    { key: '2', value: 'Berazategui' },
  ];
  const states = [{ key: '1', value: 'Buenos Aires' }];
  const selectedState = states.find(state => state.value === stepOne.state);
  const selectedLocality = localities.find(
    locality => locality.value === stepOne.locality,
  );

  const handleChangeValue = React.useCallback(
    (field: keyof StepOneFields) => (value: any) => {
      dispatch(
        actions.restaurants.handleStepOneSave({
          ...stepOne,
          [field]: value,
        }),
      );
    },
    [dispatch, stepOne],
  );

  const currentLoc =
    !stepOne.lat && !stepOne.lon
      ? initialPositionForMap
      : {
          ...initialPositionForMap,
          latitude: Number(stepOne.lat) || 0,
          longitude: Number(stepOne.lon) || 0,
        };

  return (
    <View>
      <Headline6>{localizedStrings.restaurant.create.direction}</Headline6>
      <View style={styles.inputContainer}>
        <Input
          onChangeText={handleChangeValue('name')}
          containerStyles={styles.input}
          value={stepOne.name}
          onValidateText={notEmpty}
          errorMessage="Debe ingresar un nombre"
          placeholder={localizedStrings.restaurant.create.restaurantName}
        />
        <View style={styles.doubleInputContainer}>
          <Input
            onChangeText={handleChangeValue('street')}
            onValidateText={notEmpty}
            containerStyles={[styles.input, styles.smallInput]}
            value={stepOne.street}
            errorMessage="Debe ingresar una calle"
            placeholder={localizedStrings.restaurant.create.street}
          />
          <View style={styles.separator} />
          <Input
            keyboardType="numeric"
            onValidateText={notEmpty}
            onChangeText={handleChangeValue('streetNumber')}
            errorMessage="Debe ingresar un numero de domicilio"
            containerStyles={[styles.input, styles.smallInput]}
            value={stepOne.streetNumber}
            placeholder={localizedStrings.restaurant.create.streetNumber}
          />
        </View>
        <Input
          onChangeText={handleChangeValue('neighborhood')}
          containerStyles={styles.input}
          onValidateText={notEmpty}
          errorMessage="Debe ingresar un barrio"
          value={stepOne.neighborhood}
          placeholder={localizedStrings.restaurant.create.neighborhood}
        />
        <Dropdown
          onValueChanged={handleChangeValue('state')}
          containerStyles={styles.input}
          errorMessage="Debe ingresar una provincia"
          defaultPair={selectedState}
          onValidateValue={atLeastOneSelected}
          data={states}
          placeholder={localizedStrings.restaurant.create.state}
        />
        <Dropdown
          onValueChanged={handleChangeValue('locality')}
          errorMessage="Debe ingresar una localidad"
          containerStyles={styles.input}
          defaultPair={selectedLocality}
          onValidateValue={atLeastOneSelected}
          data={localities}
          placeholder={localizedStrings.restaurant.create.town}
        />
      </View>
      <View style={styles.mapTitleContainer}>
        <Headline6 style={styles.mapTitle}>
          {localizedStrings.restaurant.create.geolocalization}
        </Headline6>
        {/* <Caption>
          {localizedStrings.restaurant.create.localizationSubtitle}
        </Caption> */}
      </View>
      <MapView
        style={styles.map}
        initialRegion={currentLoc}
        ref={map}
        region={currentLoc}
        zoomEnabled={false}
        pitchEnabled={false}
        scrollEnabled={false}
        zoomTapEnabled={false}>
        {stepOne.lat && stepOne.lon && (
          <Marker
            coordinate={{
              latitude: Number(stepOne.lat) || initialPositionForMap.latitude,
              longitude: Number(stepOne.lon) || initialPositionForMap.longitude,
            }}
            title="Tu ubicacion"
          />
        )}
      </MapView>
    </View>
  );
}
