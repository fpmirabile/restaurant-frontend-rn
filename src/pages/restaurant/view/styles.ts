import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flexDirection: 'column',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
    marginLeft: 20,
  },
  restaurantTitle: {
    flexDirection: 'column',
  },
  restaurantAdress: {
    marginHorizontal: 20,
  },
  openRestaurent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginVertical: 22,
  },
  categoryContainer: {
    backgroundColor: COLORS.background,
    marginTop: 20,
  },
  openingListContainer: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 20,
    justifyContent: 'center',
  },
  newDishButton: {
    minWidth: '100%',
  },
  createNewDishContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: 18,
    paddingHorizontal: 16,
    bottom: 1,
  },
});
