import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  commentStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // flex: 1,
  },
  profilePhoto: {
    marginLeft: 16,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  imageStyle: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
  },
  textStyle: {
    margin: 16,
    paddingRight: 40,
    alignItems: 'flex-start',
  },
  starsSpace: {
    paddingTop: 8,
  },
});
