import * as React from 'react';
import { View } from 'react-native';
import {
  Caption,
  Headline6,
  Input,
  ScrollPage,
  Title,
  TouchableText,
} from '../../../components/shared';
import MapView from 'react-native-maps';
import { ICONS } from '../../../constants';
import { styles } from './styles';

interface PropTypes {}
export function CreateRestaurant({}: PropTypes) {
  const { leftChevron: LeftChevron, rightChevron: RightChevron } = ICONS;
  return (
    <ScrollPage
      internalContainerStyles={styles.container}
      scrollViewStyles={styles.scrollView}>
      <View>
        <Title darkPinkColor>Alta de restaurante</Title>
        <Caption darkPinkColor>Paso 1 de 2</Caption>
      </View>
      <View style={styles.formContainer}>
        <Headline6>Direccion</Headline6>
        <View style={styles.inputContainer}>
          <Input
            containerStyles={styles.input}
            value=""
            placeholder="Nombre del restaurante"
          />
          <View style={styles.doubleInputContainer}>
            <Input
              containerStyles={[styles.input, styles.smallInput]}
              value=""
              placeholder="Calle"
            />
            <View style={styles.separator} />
            <Input
              containerStyles={[styles.input, styles.smallInput]}
              value=""
              placeholder="Numero"
            />
          </View>
          <Input containerStyles={styles.input} value="" placeholder="Barrio" />
          <Input
            containerStyles={styles.input}
            value=""
            placeholder="Localidad"
          />
          <Input
            containerStyles={styles.input}
            value=""
            placeholder="Provincia"
          />
        </View>
        <View style={styles.mapTitleContainer}>
          <Headline6 style={styles.mapTitle}>Geolocalizacion</Headline6>
          <Caption>
            Mueva el marcador en caso de que no se encuentre geolocalizado
            correctamente
          </Caption>
        </View>
        <MapView
          provider={'google'}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          onMapReady={event => {
            console.log(event);
          }}
          onMapLoaded={event => {
            console.log(event);
          }}
          style={styles.map}
        />
        <View style={styles.bottomButtonsContainer}>
          <View style={styles.ctaContainer}>
            <LeftChevron />
            <TouchableText type="ctaText" message="Anterior" />
          </View>
          <View style={styles.ctaContainer}>
            <TouchableText type="ctaText" message="Siguiente" />
            <RightChevron />
          </View>
        </View>
      </View>
    </ScrollPage>
  );
}
