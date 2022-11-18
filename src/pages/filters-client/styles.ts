import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:16,
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
  containerView: {
    backgroundColor: COLORS.background,
    flex: 1,
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
    width: 328,
    height:48
  },
  containerIngredient:{
    flexDirection: 'row',
  },
  containerInput:{
    flex:8
  },
  priceRange:{
    flexDirection:'row',
    justifyContent:'space-around',
  },
  close:{
    paddingTop:16,
    paddingBottom:16,
  },
  containerSlider:{
    marginTop:24,
    alignItems:'center'
  },
  slider:{
    backgroundColor:COLORS.darkPink,
    height:4,
  },
  sliderUnselected:{
    height:4,
  },
  sliderButton:{
    backgroundColor:COLORS.darkPink,
    width:20,
    height:20
  },
  sliderButtonSelected:{
    backgroundColor:COLORS.darkPink,
    width:24,
    height:24
  }
});