import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.background,
    paddingTop: 50,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    textAlign: 'left',
  },
  openRestaurent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,
  },
  categoryContainer: {
    backgroundColor: COLORS.background,
    marginTop: 20,
  },
  openingListContainer: {
    marginTop: 24,
  },
  newDishButton: {
    minWidth: '100%',
  },
  createNewDishContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: 18,
  },
  emptyCategoriesMessage: {
    paddingBottom: 16,
  },
  containerView: {
    backgroundColor: COLORS.background,
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
  },
  spaceForAdress: {
    marginTop: 8,
    marginBottom: 14,
  },
  containerIcon: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  dropDownBorder: {
    borderRadius: 3.5,
    borderColor: COLORS.grey,
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
  dropdownStyles: {
    borderRadius: 3.5,
    borderColor: COLORS.grey,
  },
  restaurantImage: {
    width: '100%',
    height: 120,
    paddingTop: 14,
  },
  imageContainer: {
    marginTop: 14,
    backgroundColor: COLORS.blueSecondary,
    height: 1,
  },
});
