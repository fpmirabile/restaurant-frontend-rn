import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../style-constants';

export const styles = StyleSheet.create({
  description: {
    letterSpacing: 0.5,
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.blueSecondary,
  },
  emailInput: {
    marginTop: 16,
    marginBottom: 9,
  },
  forgotPassword: {
    marginVertical: 16,
    width: '100%',
  },
  forgotPasswordColor: {
    color: COLORS.orangePrimary,
    textAlign: 'left',
  },
});
