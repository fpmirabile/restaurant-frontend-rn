import * as React from 'react';
import { View } from 'react-native';
import {
  Body,
  Caption,
  CTAText,
  Headline6,
  Input,
  PressableView,
} from '../../../../components/shared';
import { ICONS } from '../../../../constants';
import { localizedStrings } from '../../../../localization/localized-strings';
import { styles } from './styles';

interface PropTypes {}
const AddImageIcon = ICONS.addImage;
const weekDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
export function CreateRestaurantStepTwo({}: PropTypes) {
  return (
    <View>
      <Headline6 style={styles.captionTitle}>
        {localizedStrings.restaurant.create.openHoursTitle}
      </Headline6>
      <View style={styles.timeContainer}>
        <Input
          containerStyles={styles.timeInput}
          placeholder={localizedStrings.restaurant.create.fromHour}
          value=""
        />
        <Input
          containerStyles={styles.timeInput}
          placeholder={localizedStrings.restaurant.create.toHour}
          value=""
        />
      </View>
      <Headline6 style={styles.captionTitle}>
        {localizedStrings.restaurant.create.openedDaysTitle}
      </Headline6>
      <View style={styles.openDaysContainer}>
        {weekDays.map(day => (
          <PressableView
            key={day}
            containerStyles={[
              styles.dayContainer,
              day === 'J' && styles.dayContainerSelected,
            ]}>
            <CTAText style={[day === 'J' && styles.openDaySelected]}>
              {day}
            </CTAText>
          </PressableView>
        ))}
      </View>
      <Headline6 style={styles.captionTitle}>
        {localizedStrings.restaurant.create.kindOfFoodAndRange}
      </Headline6>
      <Input
        containerStyles={styles.foodTypeInput}
        placeholder={localizedStrings.restaurant.create.kindOfFood}
        value=""
      />
      <Input
        containerStyles={styles.priceRangeInput}
        placeholder={localizedStrings.restaurant.create.priceRange}
        value=""
      />
      <Headline6 style={styles.captionTitle}>
        {localizedStrings.restaurant.create.restaurantPictures}
      </Headline6>
      <PressableView containerStyles={styles.addPictureContainer}>
        <AddImageIcon />
        <Body style={styles.addPictureBody}>
          {localizedStrings.restaurant.create.addPictures}
        </Body>
      </PressableView>
      <Caption>
        {localizedStrings.restaurant.create.picturesCaption(0, 5)}
      </Caption>
    </View>
  );
}
