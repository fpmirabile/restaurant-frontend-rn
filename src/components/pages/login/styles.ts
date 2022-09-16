import { StyleSheet } from 'react-native';
import { COLORS } from '../../../style-constants';

export const styles = StyleSheet.create({
  container: {
    //flex: 1,
    // display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBox: {
    backgroundColor: COLORS.white,
    borderRadius: 4,
    marginHorizontal: 24,
    minHeight: 278,
    minWidth: 312,
    maxHeight: 410,
    flexDirection: 'column',
    
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    minHeight: 57,
    width: '100%',
  },
  tab: {
    borderTopWidth: 2,
    borderTopColor: '#FB0067',
    paddingHorizontal: 30,
    paddingVertical: 18,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notSelectedTab: {
    borderTopWidth: 0,
    backgroundColor: COLORS.pink,
  },
  selectedLoginContent: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  loginTitle: {
    marginBottom: 8,
  },
});
