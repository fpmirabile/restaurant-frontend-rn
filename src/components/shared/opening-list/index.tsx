import * as React from 'react';
import { View } from 'react-native';
import { CTAText, Headline6, PressableView } from '..';
import { ICONS } from '../../../constants';
import { localizedStrings } from '../../../localization/localized-strings';
import { styles } from './styles';

interface PropTypes {
  darkPinkColor?: boolean;
}
const EditDay = ICONS.edit;
// const AddImageIcon = ICONS.addImage;

const weekDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const openedDays = ['L', 'M', 'X'];
const twoHours = ['L', 'M'];
export function OpeningList({ darkPinkColor }: PropTypes) {
  return (
    <View>
      {darkPinkColor ? (
        <Headline6 style={styles.captionTitle} darkPinkColor>
          {localizedStrings.restaurant.create.openingTitle}
          {darkPinkColor}
        </Headline6>
      ) : (
        <Headline6 style={styles.captionTitle}>
          {localizedStrings.restaurant.create.openingTitle}
        </Headline6>
      )}
      <View style={styles.openDaysContainer}>
        {weekDays.map(day => (
          <View style={styles.dayContainer}>
            <PressableView
              key={day}
              containerStyles={[
                styles.dayIconContainer,
                openedDays.includes(day) && styles.dayIconContainerSelected,
              ]}>
              <CTAText
                style={openedDays.includes(day) && styles.openDaySelected}>
                {day}
              </CTAText>
            </PressableView>
            <View style={styles.hoursContainer}>
              {!openedDays.includes(day) && (
                <View style={styles.hourContainer}>
                  <CTAText>{'Cerrado'}</CTAText>
                </View>
              )}
              {openedDays.includes(day) && twoHours.includes(day) && (
                <View style={styles.twoHoursContainer}>
                  <CTAText>{'08:30 a 11:00'}</CTAText>
                  <CTAText>{'  y  '}</CTAText>
                  <CTAText>{'15:00 a 18:00'}</CTAText>
                </View>
              )}
              {openedDays.includes(day) && !twoHours.includes(day) && (
                <View style={styles.hourContainer}>
                  <CTAText>{'15:00 a 18:00'}</CTAText>
                </View>
              )}
            </View>
            <PressableView>
              <EditDay />
            </PressableView>
          </View>
        ))}
      </View>
    </View>
  );
}
