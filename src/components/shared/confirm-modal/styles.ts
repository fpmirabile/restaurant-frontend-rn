import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

export const styles = StyleSheet.create({
  modalStyles: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  containerView: {
    backgroundColor: COLORS.white,
    flexDirection: 'column',
    padding: 16,
    borderRadius: 6,
  },
  parentView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitleContainer: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  closeOpenContainer: {
    marginBottom: 16,
  },
  closeIcon: {
    width: 14,
    height: 14,
    marginLeft: 15,
  },
  buttonsContainer: {
    width: '100%',
  },
  button: {
    alignSelf: 'stretch',
    minWidth: '50%',
  },
  cancelButton: {
    marginRight: 8,
  },
  spaceFromError: {
    marginTop: 8,
  },
  spaceForText: {
    marginTop: 16,
    marginBottom: 24,
  },
  subTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  spaceForStars: {
    alignItems: 'flex-start',
    paddingBottom: 16,
  },
  longText: {
    lineHeight: 44,
  },
});
