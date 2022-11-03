import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants';

export const styles = StyleSheet.create({
  modalStyles: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  containerView: {
    backgroundColor: COLORS.white,
    flexDirection: 'column',
    padding: 16,
  },
  parentView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitleContainer: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  closeOpenContainer: {
    marginBottom: 16,
  },
  closeIcon: {
    width: 14,
    height: 14,
    marginLeft: 15,
  },
  datePickersContainer: {
    flexDirection: 'column',
  },
  datePickerContainer: {
    width: '100%',
    marginTop: 16,
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  datePicker: {
    flex: 2,
  },
  firstDatePicker: {
    marginRight: 8,
  },
  secondDatePicker: {
    marginRight: 15,
  },
  datePickerClose: {},
  addRow: {
    marginBottom: 24,
  },
  buttonsContainer: {
    width: '100%',
  },
  button: {
    alignSelf: 'stretch',
    minWidth: '50%',
  },
  cancelButton: {
    marginRight: 8,
  },
  spaceFromError: {
    marginTop: 8,
  },
});
