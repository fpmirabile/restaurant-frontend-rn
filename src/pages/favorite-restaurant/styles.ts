import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.background,
    // backgroundColor: COLORS.darkPink,
    // justifyContent: 'center',
    // alignItems: 'flex-start',
    // paddingTop: 50,
    paddingHorizontal: 16,
  },
  loadingBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.background,
  },
  loadingIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listSeparator: {
    marginVertical: 8,
  },
  inputContainer: {
    marginBottom: 16,
    width: '100%',
  },
  restaurantIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  shadowElement: {
    borderRadius: 4,
    backgroundColor: COLORS.white,
  },
  restaurantItemShadowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(33, 29, 66, 0.45)',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdropInnerContainer: {
    backgroundColor: COLORS.blueSecondary,
    padding: 10,
    borderRadius: 4,
  },
  createNewRestaurantContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  newRestaurantButton: {
    minWidth: '100%',
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
    height: 200,
  },
  restaurantInfoContainer: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  temporaryCloseFont: {
    color: 'white',
  },
  addressSize: {
    minWidth: 300,
  },
  starsContainer: {
    alignItems: 'center',
    marginTop: 8,
    flexDirection: 'row',
  },
  starTitle: {
    marginRight: 8,
  },
  listBodyContainer: {
    flexDirection: 'column',
    //alignItems: 'center',
    //paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  listBodyContainerEmpty: {
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 16,
    widht: '100%',
  },
  listEmpty: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
  },
  bodyEmpty: {
    flex: 0.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listHeaderContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  title: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginBottom: 8,
  },
  titleContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  restaurantsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
