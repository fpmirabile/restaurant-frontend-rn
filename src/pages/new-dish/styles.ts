import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:16,
    // alignItems: 'center',
  },

  text: {
    paddingTop: 8,
    alignItems: 'center',
  },
  title: {
    flex: 1,
    marginTop: 8,
    textAlign: 'left',

  },
  subtilte:{
    textAlign: 'left',
    marginTop:24,
    marginBottom:8,

  },
  input: {
    marginVertical: 8,
  },
  checkbox:{
    alignContent: 'space-around',
    justifyContent: 'space-between',
    flexDirection: 'row',
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
  
  whiteBoxContainer: {
    flex: 3,
  },
  whiteBox: {
    backgroundColor: COLORS.white,
    borderRadius: 4,
    marginHorizontal: 24,
    minHeight: 278,
    minWidth: 312,
    maxHeight: 410,
    flexDirection: 'column',
  },
  elevation: {
    elevation: 20,
    shadowColor: COLORS.shadow,
  },
  emailInput: {
    marginTop: 16,
    marginBottom: 9,
  },
  selectedLoginContent: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  button: {
    flex: 1,
    width: 280,
  },
  cancelCta: {
    alignItems: 'center',
    marginTop: 16,
  },
  containerView: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  formContainer: {
    marginVertical: 7,
  },
});
