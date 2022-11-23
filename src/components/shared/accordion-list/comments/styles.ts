import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginHorizontal: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    alignItems: 'center',
  },
  body: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
  },
});
