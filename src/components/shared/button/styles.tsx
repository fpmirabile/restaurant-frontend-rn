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
    height: 36,
    flexDirection: 'row',
  },
  title: {
    color: COLORS.white,
  },
  transparent: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  bigTransparent: {
    margin: 16,
  },
  hasIcon: {
    justifyContent: 'space-between',
  },
  loadingIcon: {
    alignSelf: 'center',
    height: 38,
    width: 38,
  },
});
