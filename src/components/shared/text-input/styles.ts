import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
    flex: 1,
  },
  rightIcon: {
    right: 15,
    alignSelf: 'center',
    position: 'absolute',
    resizeMode: 'stretch',
    alignItems: 'center',
  },
});
