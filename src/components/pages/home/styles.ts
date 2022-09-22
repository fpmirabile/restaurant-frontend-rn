import { StyleSheet } from 'react-native';
import { COLORS } from '../../../style-constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: COLORS.white,
  },
  inputContainer: {
    marginBottom: 16,
  },
  titleContainer: {
    marginBottom: 16,
  },
});
