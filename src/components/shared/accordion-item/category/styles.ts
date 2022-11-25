import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
    alignItems: 'flex-start',
    flex: 1,
  },
  itemPrice: {
    color: COLORS.blueSecondary,
  },
  iconContainer: {
    justifyContent: 'center',
  },
});
