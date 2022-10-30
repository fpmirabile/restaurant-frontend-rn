import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

export const styles = StyleSheet.create({
  captionTitle: {
    marginBottom: 16,
  },
  dayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hoursContainer: {
    flex: 1,
  },
  twoHoursContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 15,
  },
  hourContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
    paddingRight: 15,
  },
  dayIconContainer: {
    backgroundColor: COLORS.white,
    height: 32,
    width: 32,
    borderWidth: 2,
    borderColor: COLORS.black,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  dayIconContainerSelected: {
    backgroundColor: COLORS.darkPink,
    borderColor: COLORS.darkPink,
  },
  openDaySelected: {
    color: COLORS.white,
  },
  openDaysContainer: {
    flexDirection: 'column',
    flex: 1,
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});
