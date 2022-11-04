import * as React from 'react';
import { View, Switch } from 'react-native';
import Modal from 'react-native-modal';
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { ColorfulButton, TransparentButton } from '../../button';
import { Headline5, Body2 } from '../../morfando-text';
import { PressableInput } from '../../text-input';
import { TouchableText } from '../../touchable-text';
import { ICONS } from '../../../../constants';
import { ImageButton } from '../../image-button';
import { styles } from './styles';
import { TimeInput } from '..';

interface PropTypes {
  isVisible: boolean;
  onClose: () => void;
  onSavePressed: (isClosed: boolean, formData: TimeInput[]) => void;
  formData?: TimeInput[];
  isOpened?: boolean;
}

const defaultValue = [
  {
    from: '',
    to: '',
  },
];

type TimeFields = keyof TimeInput;
export function EditModal({
  formData,
  isVisible,
  onClose,
  onSavePressed,
  isOpened,
}: PropTypes) {
  const [times, setTimes] = React.useState<TimeInput[]>(
    formData || defaultValue,
  );
  const [isOpen, setIsOpen] = React.useState<boolean>(isOpened || false);
  const invalidTimes = times.some(time => time.to < time.from);
  const isValidSave =
    !times.some(time => !time.to || !time.from) && !invalidTimes;

  const handleSave = () => {
    if (!isValidSave) {
      return;
    }

    onSavePressed(isOpen, times);
    setTimes(defaultValue);
    setIsOpen(false);
  };

  const removeTime = React.useCallback(
    (index: number) => () => {
      const remainingItems = times.filter((_, i) => i !== index);
      setTimes([...remainingItems]);
    },
    [setTimes, times],
  );

  const handleAddTime = React.useCallback(() => {
    if (times.length >= 2) {
      return;
    }

    setTimes([
      ...times,
      {
        from: '',
        to: '',
      },
    ]);
  }, [times, setTimes]);

  const handleSwitchChange = React.useCallback(
    (newValue: boolean) => {
      setIsOpen(newValue);
    },
    [setIsOpen],
  );

  const handleTimePicked = React.useCallback(
    (field: TimeFields, index: number) =>
      (event: DateTimePickerEvent, date?: Date) => {
        if (event.type !== 'set') {
          return;
        }

        if (date) {
          const selectedDate = date;
          const hour = selectedDate?.getHours();
          const minutes = date.getMinutes();
          const newTimes = [...times];
          newTimes[index][field] = `${hour < 10 ? `0${hour}` : hour}:${
            minutes < 10 ? `0${minutes}` : minutes
          }`;
          setTimes([...newTimes]);
        }
      },
    [times, setTimes],
  );

  const handleTouchTime = React.useCallback(
    (field: TimeFields, index: number) => () => {
      DateTimePickerAndroid.open({
        value: new Date(),
        mode: 'time',
        display: 'clock',
        onChange: handleTimePicked(field, index),
        is24Hour: true,
      });
    },
    [handleTimePicked],
  );

  return (
    <Modal
      onBackButtonPress={onClose}
      isVisible={isVisible}
      style={styles.modalStyles}>
      <View style={styles.containerView}>
        <View style={[styles.parentView, styles.modalTitleContainer]}>
          <Headline5>Selección de horarios</Headline5>
          <ImageButton
            imageStyle={styles.closeIcon}
            onPress={onClose}
            imageSvg={ICONS.closeIcon}
          />
        </View>
        <View style={[styles.parentView, !isOpen && styles.closeOpenContainer]}>
          <Body2>Cerrado</Body2>
          <Switch onValueChange={handleSwitchChange} value={isOpen} />
        </View>
        {isOpen && (
          <View style={[styles.parentView, styles.datePickersContainer]}>
            {times.map((time, index) => {
              return (
                <View key={`input-${index}`} style={styles.datePickerContainer}>
                  <PressableInput
                    onPress={handleTouchTime('from', index)}
                    containerStyles={[
                      styles.datePicker,
                      styles.firstDatePicker,
                    ]}
                    value={time.from}
                    placeholder="Apertura"
                  />
                  <PressableInput
                    onPress={handleTouchTime('to', index)}
                    containerStyles={[
                      styles.datePicker,
                      styles.secondDatePicker,
                    ]}
                    value={time.to}
                    placeholder="Cierre"
                  />
                  {index > 0 && (
                    <ImageButton
                      onPress={removeTime(index)}
                      imageStyle={styles.datePickerClose}
                      imageSvg={ICONS.closeIcon}
                    />
                  )}
                </View>
              );
            })}
          </View>
        )}
        {isOpen && (
          <View style={[styles.parentView, styles.addRow]}>
            {times.length < 2 && (
              <TouchableText
                onPress={handleAddTime}
                type="body2DarkPink"
                message="Agregar horario"
              />
            )}
          </View>
        )}
        {invalidTimes && (
          <Body2 darkPinkColor>Los horarios ingresados no son correctos.</Body2>
        )}
        <View
          style={[
            styles.parentView,
            styles.buttonsContainer,
            invalidTimes && styles.spaceFromError,
          ]}>
          <ColorfulButton
            buttonContainerStyle={[styles.button, styles.cancelButton]}
            title="Cancel"
            onPress={onClose}
          />
          <TransparentButton
            disabled={!isValidSave}
            buttonContainerStyle={[styles.button]}
            title="Guardar"
            onPress={handleSave}
          />
        </View>
      </View>
    </Modal>
  );
}
