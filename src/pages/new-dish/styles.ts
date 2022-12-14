import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    paddingTop: 8,
    alignItems: 'center',
  },
  title: {
    flex: 1,
    marginTop: 8,
    textAlign: 'left',
  },
  subtilte: {
    textAlign: 'left',
    marginTop: 24,
    marginBottom: 8,
  },
  input: {
    marginVertical: 8,
  },
  checkbox: {
    alignContent: 'space-around',
    justifyContent: 'space-between',
    flexDirection: 'row',
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

  containerView: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  addPictureBody: {
    marginTop: 5,
  },
  addIngredient: {
    marginTop: 16,
    marginBottom: 24,
  },
  createNewDishContainer: {
    backgroundColor: COLORS.background,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  newDishButton: {
    width: 156,
    height: 48,
  },
  containerIngredient: {
    flexDirection: 'row',
  },
  containerInput: {
    flex: 8,
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
});
