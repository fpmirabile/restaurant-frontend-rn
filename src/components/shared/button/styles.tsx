import { StyleSheet } from 'react-native';
import { COLORS } from '../../../style-constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.orangePrimary,
    paddingHorizontal: 6,
    paddingTop: 6,
    paddingBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  title: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
    fontFamily:"FredokaOne-Regular",
  },
});
