import { StyleSheet } from 'react-native';
import { COLORS } from '../../../style-constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.background,
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
    fontFamily:'FredokaOne-Regular',
    marginBottom: 8,
  },
  elevation:{
    elevation: 20,
    shadowColor: '#FEBDD8',
  },
  image: {
    flex: 1,
    //justifyContent: "center"
    justifyContent: 'flex-start',
    paddingTop:'35%',
    alignItems: 'center',
  },
});
