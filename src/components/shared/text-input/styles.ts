import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  input: {
    borderRadius: 3.5,
    borderColor: COLORS.black,
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
  inputBorder: {
    borderRadius: 3.5,
    borderBottomColor:COLORS.grey,
    borderBottomWidth: 1,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
    color: COLORS.black,
    paddingHorizontal: 16,
    height: 46,
    fontFamily: 'OpenSans-Regular',
    flex: 1,
  },
  rightIcon: {
    right: 15,
    top: 10,
    position: 'absolute',
    resizeMode: 'stretch',
  },
  errorMessage: {
    color: COLORS.darkPink,
    marginTop: 6,
  },
  touchableInput: {
    flex: 1,
    flexDirection: 'row',
  },
});
