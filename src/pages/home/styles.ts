import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIcon: {
    flex: 1,
  },
  listHeaderContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 40,
  },
  listBodyContainer: {
    padding: 16,
  },
  listSeparator: {
    marginVertical: 8,
  },
  inputContainer: {
    marginBottom: 16,
    width: '100%',
  },
  titleContainer: {
    marginBottom: 16,
    flexDirection: 'row',
  },
  restaurantIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  shadowElement: {
    borderRadius: 4,
    backgroundColor: COLORS.white,
    width: '100%',
  },
  restaurantItemShadowContainer: {
    flex: 1,
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
    height: 130,
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
    marginBottom: 8,
  },
  starsContainer: {
    alignItems: 'center',
    marginTop: 8,
    flexDirection: 'row',
  },
  starTitle: {
    marginRight: 8,
  },
});
