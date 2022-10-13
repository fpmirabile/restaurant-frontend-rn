import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

export const styles = StyleSheet.create({
  shadowContainer: {
    borderRadius: 4,
    backgroundColor: COLORS.white,
  },
  container: {
    backgroundColor: COLORS.darkPink,
    paddingHorizontal: 6,
    paddingTop: 6,
    paddingBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  title: {
    color: COLORS.white,
  },
  transparent: {
    backgroundColor: COLORS.white,
    margin: 16,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  hasRightIcon: {
    justifyContent: 'space-between',
  },
  rightIcon: {},
});
