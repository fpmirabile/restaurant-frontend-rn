import * as React from 'react';
import { Image, View } from 'react-native';
import {
  ScrollPage,
  Headline6,
  Body2,
  Body,
  CTAText,
  ImageButton,
  CategoryAccordion,
  CommentAccordionList,
} from '../../components/shared';
import MapView, { Marker } from 'react-native-maps';
import { localizedStrings } from '../../localization/localized-strings';
import { ICONS } from '../../constants';
import { Shadow } from 'react-native-shadow-2';
import { Rating } from 'react-native-ratings';
import NoAvailableImage from '../../assets/images/no-available-image.svg';
import { useAppSelector } from '../../redux/store';
import { styles } from './styles';

export function RestaurantClient({}) {
  const { loading, selectedRestaurant } = useAppSelector(
    state => state.restaurant.view,
  );

  const lat = Number(selectedRestaurant?.lat) || 37;
  const lon = Number(selectedRestaurant?.lon) || -58;
  return (
    <ScrollPage internalContainerStyles={styles.container}>
      {loading && (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            resizeMode="contain"
            source={require('../../assets/images/loading/loading.gif')}
          />
        </View>
      )}
      {!loading && (
        <>
          <View>
            <View>
              {selectedRestaurant?.photos.length ? (
                <Image
                  style={styles.restaurantImage}
                  source={{ uri: selectedRestaurant?.photos[0] }}
                />
              ) : (
                <NoAvailableImage style={styles.restaurantImage} />
              )}
            </View>
            <View style={styles.restaurantInformationContainer}>
              <View style={styles.restaurantTitleAndLikeContainer}>
                <View>
                  <Headline6 darkPinkColor>
                    {selectedRestaurant?.name}
                  </Headline6>
                </View>
                <View>
                  <ImageButton imageSvg={ICONS.likeNoBackground} />
                </View>
              </View>
              <View style={styles.restaurantDetailContainer}>
                <Body2>
                  <Body fontType="bold" darkPinkColor>
                    Dirección
                  </Body>{' '}
                  {selectedRestaurant?.address}
                </Body2>
                <Body2>
                  <Body fontType="bold" darkPinkColor>
                    Estilo
                  </Body>{' '}
                  {selectedRestaurant?.foodType}
                </Body2>
                <Body2>
                  <Body fontType="bold" darkPinkColor>
                    Precio medio
                  </Body>{' '}
                  {selectedRestaurant?.priceRange}
                </Body2>
              </View>
            </View>
            <View style={styles.shadowContainer}>
              <Shadow
                offset={[1, 1]}
                containerStyle={styles.starsAndComments}
                style={styles.shadow}
                sides={{ bottom: true, end: false, start: false, top: false }}
                distance={2}
                stretch
                startColor={'rgba(0, 0, 0, 0.20)'}
                endColor={'rgba(0, 0, 0, 0.03)'}
                paintInside={false}>
                <View style={styles.commentStarsDetails}>
                  <CTAText>Estrellas</CTAText>
                  <Rating
                    imageSize={16}
                    startingValue={selectedRestaurant?.stars || 0}
                    fractions={0}
                    ratingColor="#FFDF6B"
                    readonly={true}
                  />
                </View>
                <View style={styles.separator} />
                <View style={styles.commentStarsDetails}>
                  <CTAText>Comentarios</CTAText>
                  <Body2 darkPinkColor fontType="bold">
                    25
                  </Body2>
                </View>
              </Shadow>
            </View>
          </View>
          <View style={styles.subtitle}>
            <Headline6>
              {localizedStrings.restaurant.clientView.location}
            </Headline6>
          </View>
          <MapView
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            zoomTapEnabled={false}
            region={{
              latitude: lat,
              longitude: lon,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            style={styles.map}>
            <Marker
              coordinate={{
                latitude: lat,
                longitude: lon,
              }}
              title="Ubicación del restaurant"
            />
          </MapView>
          {(selectedRestaurant?.categories || []).length > 0 ? (
            <CategoryAccordion
              categories={selectedRestaurant?.categories || []}
            />
          ) : (
            <View style={styles.emptyCategoriesMessage}>
              <Body>{localizedStrings.restaurant.view.noMenus}</Body>
            </View>
          )}
          <CommentAccordionList comments={selectedRestaurant?.comments || []} />
        </>
      )}
    </ScrollPage>
  );
}
