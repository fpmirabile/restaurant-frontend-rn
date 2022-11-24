import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 52,
    backgroundColor: COLORS.background,
  },
});
