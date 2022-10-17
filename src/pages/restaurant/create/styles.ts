import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

export const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: COLORS.background,
  },
  container: {
    margin: 16,
  },
  formContainer: {
    marginVertical: 7,
  },
  inputContainer: {
    marginVertical: 16,
  },
  doubleInputContainer: {
    flexDirection: 'row',
    flex: 2,
  },
  smallInput: {
    flex: 1,
  },
  separator: {
    marginHorizontal: 8,
  },
  input: {
    marginVertical: 8,
  },
  mapTitleContainer: {
    marginBottom: 24,
  },
  mapTitle: {
    marginBottom: 16,
  },
  map: {
    minHeight: 177,
    width: '100%',
    marginBottom: 8,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  ctaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
