import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  sectionListContainer: {
    padding: 24,
  },
  personalInformationContainer: {
    flexDirection: 'row',
    margin: 24,
  },
  personalNameContainer: {
    flexDirection: 'column',
    marginLeft: 16,
  },
  profileName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editIcon: {
    marginLeft: 8,
  },
  buttonContainer: {
    marginVertical: 4,
  },
});
