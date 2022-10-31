import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  emailInput: {
    marginTop: 16,
    marginBottom: 9,
  },
  forgotPassword: {
    marginVertical: 16,
  },
  forgotPasswordColor: {
    color: COLORS.darkPink,
    textAlign: 'left',
  },
  serverError: {
    marginVertical: 8,
  },
});
