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
import { ICONS } from '../../../../constants';
import { ImageButton } from '../../image-button';
import { styles } from './styles';

export type TimeInput = {
  openTime: string;
  closeTime: string;
};

interface PropTypes {
  isVisible: boolean;
  onClose: () => void;
  onSavePressed: (isClosed: boolean, formData: TimeInput) => void;
  formData?: TimeInput;
  isOpened?: boolean;
}

const defaultValue = {
  openTime: '',
  closeTime: '',
};

type TimeFields = keyof TimeInput;
export function EditModal({
  formData,
  isVisible,
  onClose,
  onSavePressed,
  isOpened,
}: PropTypes) {
  const [time, setTimes] = React.useState<TimeInput>(
    !formData ? defaultValue : formData,
  );
  const [isOpen, setIsOpen] = React.useState<boolean>(isOpened || true);
  const invalidTimes = time.closeTime <= time.openTime;
  const isValidSave = time.closeTime && time.openTime && !invalidTimes;

  const handleSave = () => {
    if (!isValidSave) {
      return;
    }

    onSavePressed(isOpen, time);
    setTimes(defaultValue);
    setIsOpen(false);
  };

  const handleSwitchChange = React.useCallback(
    (newValue: boolean) => {
      setIsOpen(newValue);
    },
    [setIsOpen],
  );

  const handleTimePicked = React.useCallback(
    (field: TimeFields) => (event: DateTimePickerEvent, date?: Date) => {
      if (event.type !== 'set') {
        return;
      }

      if (date) {
        const selectedDate = date;
        const hour = selectedDate?.getHours();
        const minutes = date.getMinutes();
        const newTimes = { ...time };
        newTimes[field] = `${hour < 10 ? `0${hour}` : hour}:${
          minutes < 10 ? `0${minutes}` : minutes
        }`;
        setTimes(newTimes);
      }
    },
    [time, setTimes],
  );

  const handleTouchTime = React.useCallback(
    (field: TimeFields) => () => {
      DateTimePickerAndroid.open({
        value: new Date(),
        mode: 'time',
        display: 'clock',
        onChange: handleTimePicked(field),
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
          <Body2>Abierto</Body2>
          <Switch onValueChange={handleSwitchChange} value={isOpen} />
        </View>
        {isOpen && (
          <View style={[styles.parentView, styles.datePickersContainer]}>
            <View style={styles.datePickerContainer}>
              <PressableInput
                onPress={handleTouchTime('openTime')}
                containerStyles={[styles.datePicker, styles.firstDatePicker]}
                value={time.openTime}
                placeholder="Apertura"
              />
              <PressableInput
                onPress={handleTouchTime('closeTime')}
                containerStyles={[styles.datePicker, styles.secondDatePicker]}
                value={time.closeTime}
                placeholder="Cierre"
              />
            </View>
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
          <TransparentButton
            disabled={!isValidSave}
            buttonContainerStyle={[styles.button]}
            title="Cancelar"
            onPress={onClose}
          />
          <ColorfulButton
            buttonContainerStyle={[styles.button, styles.cancelButton]}
            title="Guardar"
            onPress={handleSave}
          />

        </View>
      </View>
    </Modal>
  );
}
