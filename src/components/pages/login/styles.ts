import { StyleSheet } from 'react-native';
import { COLORS } from '../../../style-constants';

export const styles = StyleSheet.create({
  container: {
    flex: 7,
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  topSideContainer: {
    flex: 6,
  },
  loginBox: {
    backgroundColor: COLORS.white,
    borderRadius: 4,
    marginHorizontal: 24,
    minHeight: 278,
    minWidth: 312,
    maxHeight: 410,
    flexDirection: 'column',
    elevation: 20,
    shadowColor: COLORS.shadow,
  },
  loginBoxFlex: {
    flex: 1,
  },
  title: {
    flex: 1,
    marginTop: 32,
  },
  tabs: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tab: {
    borderTopWidth: 2,
    borderTopColor: COLORS.darkPink,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  notSelectedTab: {
    borderTopWidth: 0,
    backgroundColor: COLORS.pink,
  },
  selectedLoginContent: {
    flexDirection: 'column',
    marginVertical: 16,
    marginHorizontal: 16,
    flex: 1,
  },
  loginTitle: {
    marginBottom: 8,
  },
  imageBackground: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    flex: 1,
  },
});
