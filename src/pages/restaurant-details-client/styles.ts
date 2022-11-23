import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.background,
  },
  restaurantInformationContainer: {
    paddingHorizontal: 16,
  },
  restaurantTitleAndLikeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  restaurantDetailContainer: {
    marginBottom: 10,
  },
  shadowContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    marginBottom: 24,
  },
  shadow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  starsAndComments: {
    flex: 1,
    justifyContent: 'space-around',
  },
  commentStarsDetails: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  separator: {
    height: 47,
    width: 1,
    backgroundColor: COLORS.grey,
  },
  restaurantImage: {
    width: '100%',
    height: 180,
  },
  subtitle: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  map: {
    minHeight: 177,
    width: '100%',
  },
  emptyCategoriesMessage: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
});
