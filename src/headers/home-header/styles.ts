import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginVertical: 16,
    backgroundColor: COLORS.background,
  },
  adminHeader: {
    justifyContent: 'flex-start',
  },
  reduceFontSize: {
    fontSize: 24,
    marginLeft: 16,
  },
});
