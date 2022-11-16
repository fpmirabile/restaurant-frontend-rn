import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropDownBorder: {
    borderRadius: 3.5,
    borderColor: COLORS.grey,
    borderWidth: 1,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
    color: COLORS.black,
    paddingHorizontal: 16,
    height: 46,
    fontFamily: 'OpenSans-Regular',
    width: '100%',
  },
  dropdownStyles: {
    borderRadius: 3.5,
    borderColor: COLORS.grey,
  },
  errorMessage: {
    color: COLORS.darkPink,
    marginTop: 6,
  },
  dropdownTextStyles: {
    color: COLORS.black,
  },
});
