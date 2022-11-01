import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:16,
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
  subtilte:{
    textAlign: 'left',
    marginTop:24,
    marginBottom:8,

  },
  input: {
    marginVertical: 8,
  },
  checkbox:{
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
  addIngredient:{
    marginTop:16,
    marginBottom:24,
  },
  createNewDishContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  newDishButton: {
    width: 156,
    height:48
  },
});
