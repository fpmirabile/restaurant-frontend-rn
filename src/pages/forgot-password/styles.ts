import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  imageBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  whiteBoxContainer: {
    flex: 3,
  },
  whiteBox: {
    backgroundColor: COLORS.white,
    borderRadius: 4,
    marginHorizontal: 24,
    minWidth: 312,
    maxHeight: 410,
    flexDirection: 'column',
    elevation: 20,
    shadowColor: COLORS.shadow,
  },
  description: {
    marginVertical: 16,
    marginHorizontal: 12,
  },
  titleContainer: {
    flex: 1,
    marginTop: 32,
    alignItems: 'center',
    width: 328,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  emailInput: {
    marginTop: 16,
    marginBottom: 9,
  },
  buttonContainer: {
    flex: 1,
    width: 280,
  },
  cancelCta: {
    alignItems: 'center',
    marginTop: 16,
  },
});
