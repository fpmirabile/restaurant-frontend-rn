import * as React from 'react';
import { View } from 'react-native';
import { ICONS } from '../../../constants';
import { localizedStrings } from '../../../localization/localized-strings';
import { ImageButton } from '../image-button';
import { CTAText, Headline6 } from '../morfando-text';
import { EditModal } from './edit-modal';
import { styles } from './styles';

interface PropTypes {
  darkPinkColor?: boolean;
  onOpenDaysChanged?: (data: OpenDays[]) => void;
  previousDates?: OpenDays[];
}

export type TimeInput = {
  from: string;
  to: string;
};

type Days = 'L' | 'M' | 'X' | 'J' | 'V' | 'S' | 'D';
type OpenDays = {
  day: Days;
  open: boolean;
  times: TimeInput[];
};

const createDaysArray = () => {
  const result: OpenDays[] = [];
  const weekDays: Days[] = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  weekDays.forEach(day => {
    result.push({
      day,
      open: false,
      times: [],
    });
  });

  return result;
};

export function OpeningList({
  darkPinkColor,
  onOpenDaysChanged,
  previousDates,
}: PropTypes) {
  const [openDays, setOpenDays] = React.useState<OpenDays[]>(
    previousDates && previousDates.length > 0
      ? previousDates
      : createDaysArray(),
  );
  const [isModalVisible, setModalVisible] = React.useState<boolean>(false);
  const [selectDay, setSelectedDay] = React.useState<Days>('L');
  const handleOpenEditModal = React.useCallback(
    (selectedDay: Days) => () => {
      setSelectedDay(selectedDay);
      setModalVisible(true);
    },
    [setModalVisible],
  );

  const handleCloseEditModal = React.useCallback(() => {
    setModalVisible(false);
  }, [setModalVisible]);

  const handleSaveModalTimes = (isOpen: boolean, timeInputs: TimeInput[]) => {
    const copyOfOpenDays = [...openDays];
    const currentDayIndex = openDays.findIndex(open => open.day === selectDay);
    if (currentDayIndex < 0) {
      return;
    }

    copyOfOpenDays[currentDayIndex].open = isOpen;
    copyOfOpenDays[currentDayIndex].times = timeInputs;
    setOpenDays([...copyOfOpenDays]);
    handleCloseEditModal();
    if (onOpenDaysChanged) {
      onOpenDaysChanged(copyOfOpenDays);
    }
  };

  const selectedDay = openDays.find(day => day.day === selectDay);
  return (
    <View>
      <Headline6 darkPinkColor={darkPinkColor} style={styles.captionTitle}>
        {localizedStrings.restaurant.create.openedDaysTitle}
      </Headline6>
      <EditModal
        onSavePressed={handleSaveModalTimes}
        isVisible={isModalVisible}
        onClose={handleCloseEditModal}
        formData={selectedDay?.times}
        isOpened={selectedDay?.open}
      />
      <View style={styles.openDaysContainer}>
        {openDays.map(days => (
          <View key={days.day} style={styles.dayContainer}>
            <View
              style={[
                styles.dayIconContainer,
                days.open && styles.dayIconContainerSelected,
              ]}>
              <CTAText style={days.open && styles.openDaySelected}>
                {days.day}
              </CTAText>
            </View>
            <View style={styles.hoursContainer}>
              <View>
                {days.open ? (
                  <View style={styles.twoHoursContainer}>
                    <CTAText>
                      {days.times.map((time, index) => {
                        return `${time.from} a ${time.to} ${
                          days.times.length > 1 && index === 0 ? 'y ' : ''
                        }`;
                      })}
                    </CTAText>
                  </View>
                ) : (
                  <View style={styles.hourContainer}>
                    <CTAText>Cerrado</CTAText>
                  </View>
                )}
              </View>
            </View>
            <ImageButton
              onPress={handleOpenEditModal(days.day)}
              imageSvg={ICONS.edit}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
