import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listHeaderContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
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
});
