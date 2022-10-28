import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants';

export const styles = StyleSheet.create({
  captionTitle: {
    marginBottom: 16,
  },
  timeContainer: {
    flex: 1,
    maxHeight: 46,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  timeInput: {
    width: '48%',
  },
  openDaysContainer: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
  dayContainer: {
    backgroundColor: COLORS.white,
    maxHeight: 32,
    borderWidth: 2,
    borderColor: COLORS.black,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  dayContainerSelected: {
    backgroundColor: COLORS.darkPink,
    borderColor: COLORS.darkPink,
  },
  openDaySelected: {
    color: COLORS.white,
  },
  foodTypeInput: {
    marginBottom: 15,
  },
  priceRangeInput: {
    marginBottom: 15,
  },
  addPictureContainer: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 14,
    marginBottom: 8,
  },
  addPictureBody: {
    marginTop: 5,
  },
});
