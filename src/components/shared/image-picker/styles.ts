import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

export const styles = StyleSheet.create({
  listContainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
    height: 200,
  },
  addPictureTouchableContainer: {
    flex: 1,
    minWidth: 300,
    minHeight: 200,
  },
  addPictureContainer: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 14,
    marginBottom: 8,
  },
  addPictureBody: {
    marginTop: 5,
    width: 240,
    textAlign:'center',
  },
  imageUploaded: {
    height: 200,
    width: 300,
  },
  separator: {
    marginHorizontal: 8,
  },
});
