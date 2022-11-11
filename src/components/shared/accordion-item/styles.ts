import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 24,
    alignItems: 'center',
  },
  body: {
    flexDirection: 'row',
    backgroundColor: COLORS.pink,
  },
  imageContainer: {
    marginVertical: 8,
    marginRight: 20,
    height: 56,
  },
  detailContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  priceContainer: {
    color: COLORS.grey,
  },
});
