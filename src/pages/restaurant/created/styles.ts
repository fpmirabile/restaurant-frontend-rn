import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  colorfulButton: {
    marginBottom: 8,
  },
});
