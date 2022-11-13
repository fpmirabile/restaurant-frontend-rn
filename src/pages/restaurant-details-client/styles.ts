import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  starsAndComments:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  commentStarsDetails:{
    alignItems: 'center',
    marginBottom: 8,
  },
  containerView: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  containerInput:{
    flex:8
  },
  containerIcon:{
    flex:1,
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
  dropdownStyles:{
    borderRadius: 3.5,
    borderColor: COLORS.grey,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.background,
  },
  restaurantCardAlignament:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowElement: {
    borderRadius: 4,
    backgroundColor: COLORS.white,
  },
  restaurantItemShadowContainer: {
    flex: 1,
  },
  createNewRestaurantContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  restaurantContainer: {
    paddingHorizontal: 16,
    marginVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  restaurantTopPosition: {
    justifyContent: 'center',
  },
  restaurantBackgroundImage: {
    width: '100%',
  },
  restaurantInfoContainer: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  addressSize: {
    minWidth: 300,
  },
    subtilte:{
    textAlign: 'left',
    marginTop:24,
    marginLeft:16,
    marginBottom:16,
  },
  map: {
    minHeight: 177,
    width: '100%',
    marginBottom: 8,
  },
  accordion:{
    backgroundColor: '#FAFAFA',
    borderBottomColor: '#E9E9E9',
    paddingLeft:16,
    paddingRight:24,

  },
  accordionTitle:{
    fontFamily: 'FredokaOne-Regular',
    fontSize: 20,
    color: COLORS.blueSecondary,
  },
  subAccordionTitle:{
    fontFamily: 'FredokaOne-Regular',
    fontSize: 20,
    color: COLORS.blueSecondary,
    marginLeft:16,
  }
});