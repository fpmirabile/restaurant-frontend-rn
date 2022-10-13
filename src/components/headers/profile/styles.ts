import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

export const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: 70,
    backgroundColor: COLORS.background,
  },
});
