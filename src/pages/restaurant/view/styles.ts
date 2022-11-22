import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flexDirection: 'column',
    paddingHorizontal: 20,
    flex: 1,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  restaurantTitle: {
    flexDirection: 'column',
  },
  openRestaurent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 22,
  },
  categoryContainer: {
    backgroundColor: COLORS.background,
    marginTop: 20,
  },
  openingListContainer: {
    marginTop: 24,
    marginBottom: 20,
    // justifyContent: 'center',
    flex: 1,
  },
  newDishButton: {
    minWidth: '100%',
  },
  createNewDishContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: 18,
    bottom: 1,
  },
  message:{
    paddingBottom:16,
  }
});
