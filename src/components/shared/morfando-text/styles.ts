import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

export const styles = StyleSheet.create({
  text: {
    fontSize: 22,
  },
  title: {
    fontFamily: 'FredokaOne-Regular',
    fontSize: 34,
    color: COLORS.darkPink,
  },
  headline5: {
    fontFamily: 'FredokaOne-Regular',
    fontSize: 24,
    color: COLORS.darkPink,
  },
  headline6: {
    fontFamily: 'FredokaOne-Regular',
    fontSize: 20,
    color: COLORS.blueSecondary,
  },
  ctaText: {
    fontFamily: 'FredokaOne-Regular',
    fontSize: 16,
    color: COLORS.blueSecondary,
  },
  body: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: COLORS.blueSecondary,
  },
  body2: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: COLORS.blueSecondary,
  },
  error: {
    color: 'red',
    fontWeight: '600',
  },
  caption: {
    fontSize: 12,
    color: COLORS.blueSecondary,
  },
  center: {
    textAlign: 'center',
  },
  darkPinkColor: {
    color: COLORS.darkPink,
  },
  bold: {
    fontFamily: 'OpenSans-Bold',
  },
  italic: {
    fontFamily: 'OpenSans-Italic',
  },
});
