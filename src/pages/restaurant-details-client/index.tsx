import * as React from 'react';
import { Image, View } from 'react-native';
import { ScrollPage, UserComment, MenuItem } from '../../components/shared';
import {
  CTAText,
  Body,
  Body2,
  Headline6,
} from '../../components/shared/morfando-text';
import MapView from 'react-native-maps';
import { localizedStrings } from '../../localization/localized-strings';
import { ICONS } from '../../constants';
import { Shadow } from 'react-native-shadow-2';
import { Rating } from 'react-native-ratings';
import Accordion from 'react-native-accordion-wrapper';
import { styles } from './styles';

const TestImage = require('../../assets/images/image.png');

interface RouterProps {}
const LikeIcon = ICONS.likeNoBackground;
const DownChevron = ICONS.rightChevron;

export function RestaurantClient({}: RouterProps) {
  // Mockeo data
  const userComments = [
    {
      user: 'Fernando',
      comment:
        'Se come bien pero tampoco tan bien. Lo recomiendo por el precio',
      stars: 3,
      image:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
    },
    {
      user: 'Nicolas',
      comment: 'El mejor chorizo de zona oeste. Recomiendo este lugar',
      stars: 5,
    },
    {
      user: 'Miguel',
      comment: 'Lugar para venir con familia, Octavio mi hijo amo el Flan.',
      stars: 4,
    },
    {
      user: 'Agustina',
      comment: 'Hay mejores parrillas, no tenian molleja',
      stars: 1,
    },
  ];

  const [rating] = React.useState<number>(5);
  return (
    <View style={styles.containerView}>
      <ScrollPage internalContainerStyles={styles.container}>
        <View style={styles.restaurantCardAlignament}>
          <Shadow
            style={styles.shadowElement}
            distance={2}
            startColor={'rgba(0, 0, 0, 0.20)'}
            endColor={'rgba(0, 0, 0, 0.03)'}
            containerStyle={styles.restaurantItemShadowContainer}
            offset={[1, 1]}>
            <View>
              <Image
                style={styles.restaurantBackgroundImage}
                source={TestImage}
              />
            </View>
            <View style={styles.restaurantContainer}>
              <View style={styles.restaurantTopPosition}>
                <Headline6 darkPinkColor>
                  {/* {item.name} */}
                  {'Verga rota'}
                </Headline6>
              </View>
              <View style={styles.restaurantTopPosition}>
                <LikeIcon />
              </View>
            </View>
            <View style={styles.restaurantInfoContainer}>
              <Body2 style={styles.addressSize}>
                <Body fontType="bold" darkPinkColor>
                  Direccion
                </Body>{' '}
                José M. Estrada 134, Haedo, Provincia de Buenos Aires - 2km
              </Body2>
              <Body2>
                <Body fontType="bold" darkPinkColor>
                  Estilo
                </Body>{' '}
                Parrilla
              </Body2>
              <Body2>
                <Body fontType="bold" darkPinkColor>
                  Precio medio
                </Body>{' '}
                $$$
              </Body2>
            </View>
            <View style={styles.starsAndComments}>
              <View style={styles.commentStarsDetails}>
                <CTAText>Estrellas</CTAText>
                <Rating
                  imageSize={16}
                  startingValue={rating}
                  fractions={0}
                  ratingColor="#FFDF6B"
                  readonly={true}
                />
              </View>
              <View style={styles.commentStarsDetails}>
                <CTAText>Comentarios</CTAText>
                <Body2 darkPinkColor fontType="bold">
                  25
                </Body2>
              </View>
            </View>
          </Shadow>
        </View>
        <View style={styles.subtilte}>
          <Headline6>
            {localizedStrings.restaurant.clientView.location}
          </Headline6>
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
        <Accordion
          shouldSelectOneItemAtATime
          headerItemsStyle={styles.accordion}
          headerTitleLabelStyle={styles.accordionTitle}
          rightChevronIcon={<DownChevron />}
          dataSource={[
            {
              title: localizedStrings.restaurant.clientView.menu,
              child: (
                <View>
                  <Accordion
                    shouldSelectOneItemAtATime
                    headerItemsStyle={styles.accordion}
                    headerTitleLabelStyle={styles.subAccordionTitle}
                    rightChevronIcon={<DownChevron />}
                    dataSource={[
                      {
                        title: 'Postres',
                        child: (
                          <View>
                            <MenuItem dishName="Flan" price={400} />
                          </View>
                        ),
                      },
                    ]}
                  />
                </View>
              ),
            },
            {
              title: localizedStrings.restaurant.clientView.comments,
              child: (
                <View>
                  {userComments.map(data => {
                    return (
                      <UserComment
                        key={data.user}
                        user={data.user}
                        comment={data.comment}
                        stars={data.stars}
                        profilePhoto={data.image}
                      />
                    );
                  })}
                </View>
              ),
            },
          ]}
        />
      </ScrollPage>
    </View>
  );
}
